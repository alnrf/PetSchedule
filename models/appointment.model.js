const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  pet_name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  genre: {
    type: String,

    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
});

const appointmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    pet_id: {
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
    service_id: {
      type: String,
      required: true,
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
    pet: { petSchema },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = AppointmentModel;
