const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const mongoDBUrl = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        console.log(`Please wait trying to contact Mongo Database.. 😁`);
        setTimeout(async () => {
            await mongoose.connect(mongoDBUrl);
            console.log("Database connection successful 🎊");
        }, 2000);
    } catch (error) {
        console.log('Error connecting to the database 💀');
    }
    finally {
        setTimeout(() => {
            console.log(`Connection instance completed succeffuly. ~ Codebyviral ❤️`);
        }, 5000);
    }
}

module.exports = connectDb;