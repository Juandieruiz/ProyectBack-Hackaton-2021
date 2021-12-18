"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const nodemailer = require('nodemailer');
// const emailTransportConfigure = require("../lib/emailTransportConfigure");

// Definición del Esquema
const usuarioSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  exp: Number,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      // autopopulate: true,
    },
  ],
});

// usuarioSchema.plugin(require("mongoose-autopopulate"));

usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};

usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.passwordHash);
};

// usuarioSchema.methods.enviarEmail = async function (asunto, cuerpo) {
//   const transport = await emailTransportConfigure();

//   // enviar el email
//   const result = await transport.sendMail({
//     from: process.env.EMAIL_SERVICE_FROM,
//     to: this.email,
//     subject: asunto,
//     html: cuerpo,
//   });

//   result.getTestMessageUrl = nodemailer.getTestMessageUrl(result);

//   return result;
// };

// Creación del Modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Exportando el Modelo
module.exports = Usuario;
