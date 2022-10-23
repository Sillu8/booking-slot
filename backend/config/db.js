const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to localhost`.cyan);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB