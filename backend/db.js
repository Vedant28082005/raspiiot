const mongoose = require('mongoose');
require('dotenv').config()


const mongoDBUrl = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Database connection successful 🎊");

    } catch (error) {
        console.log('Error connecting to the database');
    }
}

module.exports = connectDb;