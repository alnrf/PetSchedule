const express = require("express");
const ServicesModel = require("../models/services.model.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const service = await ServicesModel.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const service = await ServicesModel.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serviceUpdate = await ServicesModel.findByIdAndUpdate(id, req.body);

    if (!serviceUpdate) {
      return res.status(404).json({ message: "Serviço não encontrado!" });
    }

    const updatedService = await ServicesModel.findById(id);
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serviceDelete = await ServicesModel.deleteOne({ id });

    if (!serviceDelete) {
      return res.status(404).json({ message: "Serviço não encontrado!" });
    }

    res.status(200).json({ message: "Serviço deletado." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
