const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI).then(() => {console.log(`Connected to localhost`.cyan)}).catch((err)=>console.log(err));
    } catch (error) {
    console.log(error);
    process.exit(1)
}
}

module.exports = connectDB