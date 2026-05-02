const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: [true, 'Please provide a class name'],
        trim: true
    },
    instructor: {
        type: String,
        default: 'Teacher'
    },
    classCode: {
        type: String,
        required: true,
        unique: true, // Crucial: No two classes can have the same code
        index: true // Industry standard: indexing makes searching by code faster
    }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);