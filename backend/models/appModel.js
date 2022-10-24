const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    application: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        strategy: {
            type: String,
            required: true,
        },
        revenueModel: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        default: 'pending'
    },
    slot: {
        type: String,
        default: null
    }
},{timestamps: true})

module.exports = mongoose.model('application',appSchema)