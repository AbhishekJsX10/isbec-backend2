const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env');
const Demo = require('../models/Demo');
const { generateDemoUserEmail, generateDemoOwnerEmail } = require('../src/templates');

const TEAM_EMAILS = [EMAIL, 'avishekchaturvedi0@gmail.com'];

const WORKING_HOURS = {
    start: 10,  // 10:30 AM
    end: 18    // 6:30 PM
};

// Helper function to create a date range for a specific date and time
const createDateRangeForSlot = (date, timeSlot) => {
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    // Convert to 24-hour format if PM
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const startDate = new Date(date);
    startDate.setHours(hour, parseInt(minutes), 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    return { startDate, endDate };
};

// Check if a slot is available
const checkSlotAvailability = async (req, res) => {
    try {
        console.log('Checking availability for:', req.query.date, req.query.timeSlot);
        const { date, timeSlot } = req.query;
        
        if (!date || !timeSlot) {
            console.log('No date or time slot provided');
            return res.status(400).json({ error: "Date and time slot are required" });
        }

        const { startDate, endDate } = createDateRangeForSlot(date, timeSlot);

        // Check if time is within working hours
        const hour = startDate.getHours();
        if (hour < WORKING_HOURS.start || hour >= WORKING_HOURS.end) {
            console.log('Time is not within working hours');
            return res.status(400).json({ 
                available: false,
                error: `Booking is only available between ${WORKING_HOURS.start}:30 AM and ${WORKING_HOURS.end}:30 PM`
            });
        }

        // Check if date is in the past
        if (startDate < new Date()) {
            console.log('Date is in the past');
            return res.status(400).json({ 
                available: false,
                error: "Cannot book slots in the past"
            });
        }

        console.log('Checking for existing booking between:', startDate, 'and', endDate);

        // Check if slot is already booked
        const existingBooking = await Demo.findOne({
            appointmentDate: {
                $lt: endDate,
                $gte: startDate
            },
            status: 'scheduled'
        });

        console.log('Existing booking:', existingBooking);

        const isAvailable = !existingBooking;
        res.status(200).json({ 
            available: isAvailable,
            message: isAvailable ? "Slot is available" : "Slot is already booked"
        });

    } catch (error) {
        console.error('Error checking slot availability:', error);
        res.status(500).json({
            error: "Failed to check slot availability"
        });
    }
};

// Get available slots for a date
const getAvailableSlots = async (req, res) => {
    try {
        console.log('Getting available slots for date:', req.query.date);
        const { date } = req.query;
        if (!date) {
            console.log('No date provided');
            return res.status(400).json({ error: "Date is required" });
        }

        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        
        console.log('Selected date range:', selectedDate, 'to', nextDate);
        
        // Get all booked slots for the date
        const bookedSlots = await Demo.find({
            appointmentDate: {
                $gte: selectedDate,
                $lt: nextDate
            },
            status: 'scheduled'
        }).select('appointmentDate -_id');

        console.log('Found booked slots:', bookedSlots);

        const bookedTimes = bookedSlots.map(slot => {
            const time = new Date(slot.appointmentDate);
            return time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).toUpperCase(); // Convert to uppercase to match the format
        });

        console.log('Booked times:', bookedTimes);

        // Generate all possible slots
        const slots = [];
        const startTime = new Date(selectedDate);
        startTime.setHours(WORKING_HOURS.start, 30, 0, 0);
        const endTime = new Date(selectedDate);
        endTime.setHours(WORKING_HOURS.end, 30, 0, 0);

        // Generate 30-minute slots
        while (startTime <= endTime) {
            const timeString = startTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).toUpperCase(); // Convert to uppercase to match the format
            
            // Don't add slots in the past
            if (startTime > new Date() && !bookedTimes.includes(timeString)) {
                slots.push(timeString);
            }
            
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        console.log('Available slots:', slots);
        res.status(200).json({ slots });

    } catch (error) {
        console.error('Error getting available slots:', error);
        res.status(500).json({
            error: "Failed to get available slots"
        });
    }
};

// Book a new demo
const bookDemo = async (req, res) => {
    try {
        const { name, email, phone, date, timeSlot, message } = req.body;
        console.log('Booking demo for:', { name, email, phone, date, timeSlot });

        if (!name || !email || !phone || !date || !timeSlot) {
            console.log('Not all required fields provided');
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const { startDate: appointmentDate } = createDateRangeForSlot(date, timeSlot);
        console.log('Checking if slot is still available at:', appointmentDate);

        // Check if slot is still available
        const existingBooking = await Demo.findOne({
            appointmentDate: {
                $lt: new Date(appointmentDate.getTime() + 30 * 60000),
                $gte: appointmentDate
            },
            status: 'scheduled'
        });

        if (existingBooking) {
            console.log('Slot is no longer available');
            return res.status(409).json({
                error: "This slot is no longer available",
                slotTaken: true
            });
        }

        // Create new booking
        const demo = new Demo({
            name,
            email,
            phone,
            appointmentDate,
            message: message || 'Not specified',
            status: 'scheduled'
        });

        await demo.save();
        console.log('Demo booked successfully');

        // Send confirmation emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        // Format date and time for email templates
        const formattedDate = appointmentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Send to customer
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: 'Your Demo Session Confirmed - ISBE Consultancy',
            html: generateDemoUserEmail({
                name,
                date: formattedDate,
                time: timeSlot
            })
        });

        // Send to team
        await transporter.sendMail({
            from: EMAIL,
            to: TEAM_EMAILS,
            subject: ' New Demo Session Scheduled - Action Required',
            html: generateDemoOwnerEmail({
                name,
                email,
                phone,
                date: formattedDate,
                time: timeSlot,
                message: message || 'No additional notes provided'
            })
        });

        res.status(201).json({
            success: true,
            message: "Demo booked successfully! Check your email for confirmation."
        });

    } catch (error) {
        console.error('Error booking demo:', error);
        res.status(500).json({
            error: "Failed to book demo"
        });
    }
};

module.exports = {
    checkSlotAvailability,
    getAvailableSlots,
    bookDemo
};
