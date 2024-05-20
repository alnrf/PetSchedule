const express = require("express");
const Users = require("../models/users.model.js");
const ProfileModel = require("../models/profile.model.js");
const PetModel = require("../models/pet.model.js");
const router = express.Router();

//get users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//post user
router.post("/", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Update user password
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdate = await Users.findByIdAndUpdate(id, req.body);

    if (!userUpdate) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const updatedUser = await Users.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDelete = await Users.deleteOne({ id });

    if (!userDelete) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const petDelete = await PetModel.deleteMany({ owner_id: id });

    if (!petDelete) {
      return res.status(404).json({ message: "Pets não encontrados!" });
    }

    const profileDelete = await ProfileModel.deleteOne({ user_id: id });

    if (!profileDelete) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    res.status(200).json({ message: "Usuário, pets e perfil deletados." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
