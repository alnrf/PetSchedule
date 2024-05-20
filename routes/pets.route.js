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

module.exports = router;
