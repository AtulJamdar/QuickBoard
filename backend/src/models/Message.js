const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Message cannot be empty'],
        trim: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', // Links to the Class model
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);