const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user.route.js");
const profileRoute = require("./routes/profile.route.js");
const petRoute = require("./routes/pets.route.js");
const scheduleRoute = require("./routes/schedule.route.js");

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/pet", petRoute);
app.use("/api/schedule", scheduleRoute);

// //Posts

// //Get Pets by ID
// app.get("/api/pets/pet/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pet = await PetModel.findById(id);
//     res.status(200).json(pet);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// //Pet
// app.delete("/api/pet/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletePet = await PetModel.findByIdAndDelete(id);
//     if (!deletePet) {
//       return res.status(404).json({ message: "Não encontrado" });
//     }
//     res
//       .status(200)
//       .json({ message: `Pet ${deletePet.pet_name} removido com sucesso!` });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://arfdev:gfeJnlGm7U3RAP8P@schedule.cqmuyo6.mongodb.net/scheduleDB?retryWrites=true&w=majority&appName=Schedule"
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(() => {
    console.log("Conexão Falhou");
  });
