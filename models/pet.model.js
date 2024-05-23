const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
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

const PetModel = mongoose.model("Pets", petSchema);

module.exports = PetModel;
