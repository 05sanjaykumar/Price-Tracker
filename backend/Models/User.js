const mongoose = require('mongoose');
const Item = require('../Models/Item'); // Import the Item model

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' // Reference to the Item model
    }]
});

module.exports = mongoose.model('User', userSchema);
