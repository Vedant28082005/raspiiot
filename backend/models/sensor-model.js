const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    timestamp: Date
});

const SensorData = mongoose.model('SensorData', sensorSchema);


module.exports={
    SensorData,
}
