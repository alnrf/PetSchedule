const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Informe um nome."],
    },
    email: {
      type: String,
      required: [true, "Informe um email."],
    },
    password: { type: String, required: [true, "Informe sua senha."] },

    role: {
      type: String,
      required: [true, "Informe sua senha."],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
