const express = require("express");

const ProfileModel = require("../models/profile.model.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const petData = req.body;
    const newPet = {
      pet_name: petData.pet_name,
      breed: petData.breed,
      genre: petData.genre,
      specie: petData.specie,
      birth: petData.birth,
    };

    const profile = await ProfileModel.findOneAndUpdate(
      { user_id: petData.owner_id },
      { $push: { pets: newPet } },
      { new: true, useFindAndModify: false }
    );
    if (!profile) {
      return res.status(404).send({ message: "Perfil não encontrado" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:userId/pet/:petId", async (req, res) => {
  const { userId, petId } = req.params;
  const { pet_name, breed, genre, specie, birth } = req.body;

  try {
    const result = await ProfileModel.findOneAndUpdate(
      { user_id: userId, "pets._id": petId },
      {
        $set: {
          "pets.$.pet_name": pet_name,
          "pets.$.breed": breed,
          "pets.$.genre": genre,
          "pets.$.specie": specie,
        },
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: "Pet not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:userId/pet/:petId", async (req, res) => {
  const { userId, petId } = req.params;
  try {
    const result = await ProfileModel.findOneAndUpdate(
      { user_id: userId },
      {
        $pull: {
          pets: { _id: petId },
        },
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: "Pet not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
