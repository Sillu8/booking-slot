const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        email: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    phone: {
        type: String,
        required: [true, 'Please add a Phone Number']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
    appId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'application'
    } 
}, { timestamps: true})

module.exports = mongoose.model('user',userSchema)