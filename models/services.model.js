const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    estimated_duration: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ServicesModel = mongoose.model("Services", serviceSchema);

module.exports = ServicesModel;
