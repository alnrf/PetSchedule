const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user.route.js");
const profileRoute = require("./routes/profile.route.js");
const petRoute = require("./routes/pets.route.js");
const scheduleRoute = require("./routes/schedule.route.js");
const servicesRoute = require("./routes/services.route.js");
const appointmentRoute = require("./routes/appointments.route.js");

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/pet", petRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/service", servicesRoute);
app.use("/api/appointments", appointmentRoute);

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
