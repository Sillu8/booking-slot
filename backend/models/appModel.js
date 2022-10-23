const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    application: {
        type: Object,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isPending: {
        type: Boolean,
        default: false,
    },
},{timestamps: true})

module.exports = mongoose.model('application',appSchema)