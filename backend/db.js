const mongoose = require('mongoose');

const mongoDBUrl = "mongodb+srv://vedant:vedant123@cluster0.x2uku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Database connection successful 🎊");
        
    } catch (error) {
        console.log('Error connecting to the database');
    }
}

module.exports = connectDb