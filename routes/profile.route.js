const express = require("express");

const ProfileModel = require("../models/profile.model.js");
const PetModel = require("../models/pet.model.js");
const router = express.Router();

//get user profile by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await ProfileModel.findOne({ user_id: id });
    const pets = await PetModel.find({ owner_id: id });
    const result = {
      profile: profile,
      pets: pets,
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//get all user profile
router.get("/", async (req, res) => {
  try {
    const profile = await ProfileModel.find();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const profileData = req.body;
    const profile = new ProfileModel({
      user_id: profileData.user_id,
      name: profileData.name,
      address: {
        street: profileData.address.street,
        number: profileData.address.number,
        city: profileData.address.city,
        state: profileData.address.state,
        neighborhood: profileData.address.neighborhood,
        zipcode: profileData.address.zipcode,
        complement: profileData.address.complement,
        reference: profileData.address.reference,
      },
      phone: profileData.phone,
      email: profileData.email,
    });
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
