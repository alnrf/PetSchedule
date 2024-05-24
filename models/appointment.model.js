const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
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
    service_id: {
      type: String,
      required: true,
    },
    service_description: {
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
    status: {
      type: String,
      enum: ["open", "finished", "canceled"],
      required: true,
      default: "open",
    },
    pet: [
      {
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = AppointmentModel;
