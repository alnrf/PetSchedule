const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  slots: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

const daySchema = new mongoose.Schema({
  day: { type: Date, required: true },
  description: { type: String, required: true },
  times: [timeSchema],
});

const monthSchema = new mongoose.Schema(
  {
    month: { type: Date, required: true },
    description: { type: String, required: true },
    days: [daySchema],
  },
  {
    timestamps: true,
  }
);

const ScheduleModel = mongoose.model("Schedule", monthSchema);

module.exports = ScheduleModel;
