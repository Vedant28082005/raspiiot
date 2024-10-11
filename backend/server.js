const express = require("express");
const { SensorData } = require("./models/sensor-model.js")
const mongoose = require("mongoose");
const connectDb = require("./db.js")
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    method: "GET, POST, PUT, PATCH, DELETE",
    Credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}
app.use(cors(corsOptions));

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
        const dataCreated = await SensorData.create({ temperature: temperature, humidity: humidity })

        console.log("Sensor data saved successfully:", dataCreated);
        return res.send(`Data uploaded Successfully! Temperature: ${temperature}, Humidity: ${humidity}`);
    } catch (error) {
        console.error("Error saving sensor data:", error);
        return res.status(500).send("Failed to upload data. Please try again later.");
    }
});

app.get("/api/sensorData", async (req, res) => {
    try {
        const sensorDatas = await SensorData.find();
        res.json(sensorDatas);
    } catch (error) {
        console.log('Error  fetching sensor data:', error);
    }
})

const port = 8000;
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
    connectDb();
});
