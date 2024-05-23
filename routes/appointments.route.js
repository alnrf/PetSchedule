const express = require("express");
const AppointmentModel = require("../models/appointment.model.js");
const ProfileModel = require("../models/profile.model.js");
const ServicesModel = require("../models/services.model.js");
const router = express.Router();

router.get("", async (req, res) => {
  try {
  } catch {}
});
router.post("/", async (req, res) => {
  try {
    const { user_id, pet_id, service_id, origin, appointment } = req.body;

    const userProfile = await ProfileModel.findOne({ user_id });

    if (!userProfile) {
      return res.status(404).send({ message: "User profile not found" });
    }

    const serviceData = await ServicesModel.findById(service_id);

    if (!serviceData) {
      return res.status(404).send({ message: "Serviço não encontrado" });
    }

    const { name, email, phone } = userProfile;

    const petData = userProfile.pets.id(pet_id);

    if (!petData) {
      return res.status(404).send({ message: "Pet not found" });
    }

    const appointmentData = {
      user_id,
      pet_id,
      service_id,
      name,
      email,
      phone,
      service: serviceData.description,
      estimated_duration: serviceData.estimated_duration,
      origin,
      appointment,
      pet: {
        pet_name: petData.pet_name,
        breed: petData.breed,
        genre: petData.genre,
        specie: petData.specie,
        birth: petData.birth,
      },
    };

    const newAppointment = await AppointmentModel.create(appointmentData);

    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.patch("", async (req, res) => {
  try {
  } catch {}
});
router.delete("", async (req, res) => {
  try {
  } catch {}
});

module.exports = router;
