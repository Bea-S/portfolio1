const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  birthDate: { type: Date },
});

module.exports = mongoose.model('Patient', patientSchema);
