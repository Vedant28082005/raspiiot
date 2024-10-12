const express = require("express");
const { SensorData } = require("./models/sensor-model.js");
const mongoose = require("mongoose");
const connectDb = require("./db.js");
const cors = require('cors');

const app = express();

// CORS options
const corsOptions = {
    origin: 'https://raspiiot.vercel.app',
    methods: "GET, POST, PUT, PATCH, DELETE", // Should be 'methods' not 'method'
    credentials: true,  // 'credentials' is lowercase
    allowedHeaders: 'Content-Type, Authorization'
};
app.use(cors(corsOptions));

// Root route
app.get("/", (req, res) => {
    return res.send('Hello From Home Page');
});

app.get("/about", (req, res) => {
    return res.send("Hello from about Page");
});

// Route to save sensor data
app.get('/sensor', async (req, res) => {
    try {
        const temperature = parseFloat(req.query.temperature);
        const humidity = parseFloat(req.query.humidity);

        if (!temperature || !humidity) {
            return res.status(400).send("Temperature and humidity parameters are required.");
        }
        
        // Save the data to the database
        const dataCreated = await SensorData.create({ temperature, humidity });
        console.log("Sensor data saved successfully:", dataCreated);
        return res.send(`Data uploaded successfully! Temperature: ${temperature}, Humidity: ${humidity}`);
    } catch (error) {
        console.error("Error saving sensor data:", error);
        return res.status(500).send("Failed to upload data. Please try again later.");
    }
});

// Route to fetch sensor data
app.get("/api/sensorData", async (req, res) => {
    try {
        const sensorDatas = await SensorData.find();
        return res.json(sensorDatas);
    } catch (error) {
        console.log('Error fetching sensor data:', error);
        return res.status(500).send("Error fetching sensor data.");
    }
});

// Connect to the database and start the server
const port = 8000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port} 🥸`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
});
