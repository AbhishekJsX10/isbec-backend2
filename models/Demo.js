const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        default: 'Not specified'
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a compound index for appointmentDate to ensure uniqueness within a time window
demoSchema.index({ appointmentDate: 1 });

module.exports = mongoose.model('Demo', demoSchema);
