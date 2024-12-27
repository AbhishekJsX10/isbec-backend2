const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo-Controller');
const { mailController } = require('../controllers/mail-Controller');
const { contactController } = require('../controllers/contact-Controller');

// Demo routes
router.get('/demo/slots', demoController.getAvailableSlots);
router.get('/demo/check-slot', demoController.checkSlotAvailability);
router.post('/demo/book', demoController.bookDemo);

// Mail routes
router.post('/mail/send', mailController);

// Contact route
router.post('/contact', contactController);

module.exports = router;
