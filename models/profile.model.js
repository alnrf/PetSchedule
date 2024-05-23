const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
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
      enum: ["male", "female"],
      required: true,
    },
    specie: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const profileSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      neighborhood: { type: String, required: true },
      zipcode: { type: String, required: true },
      complement: { type: String },
      reference: { type: String },
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pets: {
      type: [petSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ProfileModel = mongoose.model("Profiles", profileSchema);

module.exports = ProfileModel;
