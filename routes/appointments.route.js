const express = require("express");
const AppointmentModel = require("../models/appointment.model.js");
const ProfileModel = require("../models/profile.model.js");
const ServicesModel = require("../models/services.model.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, pet_id, service_id, origin, appointment } = req.body;

    const profile = await ProfileModel.findOne({ user_id });
    if (!profile) {
      return res.status(404).send({ message: "Perfil não encontrado." });
    }

    const pet = profile.pets.id(pet_id);
    if (!pet) {
      return res.status(404).send({ message: "Pet não enconttrado." });
    }

    const service = await ServicesModel.findById(service_id);
    if (!service) {
      return res.status(404).send({ message: "Serviço não encontrado." });
    }

    const appointmentData = {
      user_id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      service_id,
      service_description: service.description,
      origin,
      appointment,
      pet: [
        {
          pet_name: pet.pet_name,
          breed: pet.breed,
          genre: pet.genre,
          specie: pet.specie,
        },
      ],
    };

    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();

    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentUpdate = await AppointmentModel.findByIdAndUpdate(
      id,
      req.body
    );

    if (!appointmentUpdate) {
      return res.status(404).json({ message: "Agendamento não encontrado!" });
    }

    const updatedAppointment = await AppointmentModel.findById(id);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentDelete = await AppointmentModel.deleteOne({ id });

    if (!appointmentDelete) {
      return res.status(404).json({ message: "Agendamento não encontrado!" });
    }

    res.status(200).json({ message: "Agendamento deletado." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
