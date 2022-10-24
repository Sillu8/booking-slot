const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    slot: {
        type: String,
        default: null
    }
},{timestamps: true})

module.exports = mongoose.model('slot', slotSchema, 'slot')