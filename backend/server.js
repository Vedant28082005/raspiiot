const express = require("express");
const {SensorData} = require("./models/sensor-model.js")
const mongoose = require("mongoose");
const connectDb = require("./db.js")
const app = express();

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

const port = 8000;
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
    connectDb();
});
