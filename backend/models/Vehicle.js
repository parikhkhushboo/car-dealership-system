const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  category: String,
  price: Number,
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);