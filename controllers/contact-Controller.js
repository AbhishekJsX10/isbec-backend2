const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env');
const { generateUserEmail, generateOwnerEmail } = require('../src/templates');

const TEAM_EMAILS = [EMAIL, 'avishekchaturvedi0@gmail.com'];

const contactController = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        console.log('Received contact form submission:', { name, email, phone, message });

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        console.log('Sending emails to team:', TEAM_EMAILS);

        // Email to ISBEC team using new template
        const mailToTeam = {
            from: EMAIL,
            to: TEAM_EMAILS.join(', '),
            subject: 'New Contact Form Submission - ISBE Consultancy',
            html: generateOwnerEmail({
                name,
                email,
                phone,
                message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            })
        };

        // Acknowledgment email to user using new template
        const mailToUser = {
            from: EMAIL,
            to: email,
            subject: 'Thanks for contacting ISBE Consultancy',
            html: generateUserEmail({ name })
        };

        try {
            // Send email to team
            const teamMailResult = await transporter.sendMail(mailToTeam);
            console.log('Team email sent:', teamMailResult);

            // Send acknowledgment to user
            const userMailResult = await transporter.sendMail(mailToUser);
            console.log('User acknowledgment sent:', userMailResult);

            res.status(200).json({ 
                message: "Message sent successfully",
                teamMailId: teamMailResult.messageId,
                userMailId: userMailResult.messageId
            });
        } catch (emailError) {
            console.error('Error sending emails:', emailError);
            throw emailError;
        }

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            error: "Failed to send message", 
            details: error.message 
        });
    }
};

module.exports = { contactController };
