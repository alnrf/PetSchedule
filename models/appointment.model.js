const mongoose = require("mongoose");
const PetModel = require("./pet.model");

const appointmentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  appointment: {
    type: Date,
    required: true,
  },
  pet: { PetModel },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
