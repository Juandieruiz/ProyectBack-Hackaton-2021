"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log(
    "Conectado a la Base de Datos de MongoDB:",
    mongoose.connection.name
  );
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {});

module.exports = mongoose.connection;
