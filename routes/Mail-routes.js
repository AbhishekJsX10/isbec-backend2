const router = require('express').Router();
const { mailController } = require('../controllers/mail-Controller');
const { contactController } = require('../controllers/contact-Controller');
const demoController = require('../controllers/demo-Controller');

// Mail routes
router.post('/mail', mailController);

// Contact routes
router.post('/contact', contactController);

// Demo routes
router.get('/demo/check-slot', demoController.checkSlotAvailability);  // Check if a specific slot is available
router.get('/demo/slots', demoController.getAvailableSlots);          // Get all available slots for a date
router.post('/demo', demoController.bookDemo);                        // Book a demo
router.get('/demo/bookings', demoController.getAllBookings);          // Get all bookings
router.patch('/demo/booking/:id/status', demoController.updateBookingStatus); // Update booking status

module.exports = router;