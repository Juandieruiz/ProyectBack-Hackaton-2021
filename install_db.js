"use strict";

require("dotenv").config();

const mongoose = require("mongoose");
const readline = require("readline");

// Conexión con la Base de Datos
const dbConnection = require("./lib/connectMongoose");

// Modelo de Usuarios y Anuncios
const { Usuario, Curso } = require("./models");
const cursoData = require("./cursos.json");

main().catch((err) => console.log("Hubo un error: ", err));

async function main() {
  await new Promise((resolve, reject) => {
    dbConnection.once("open", resolve);
    dbConnection.once("error", reject);
  });

  if (
    !(await askYesNo(
      "Estás seguro de que quieres inicializar la Base de Datos? (yes/no)"
    ))
  ) {
    console.log("Abortado el comando. La Base de Datos no se ha inicializado.");
    return process.exit(0);
  }

  // inicializo la colección de cursos
  await initCursos();
  // inicializo la colección de usuarios
  await initUsuarios();

  dbConnection.close();
}

async function initUsuarios() {
  // Eliminar todos los usuarios existentes
  const { deletedCount } = await Usuario.deleteMany();
  console.log(`Eliminados ${deletedCount} usuarios.`);

  // Crear usuarios por defecto
  const result = await Usuario.insertMany([
    {
      name: "Usuario de Prueba",
      email: "user@example.com",
      passwordHash: await Usuario.hashPassword("1234"),
      exp: 0,
      courses: [],
    },
  ]);
  console.log(`Insertados ${result.length} usuarios.`);
}

async function initCursos() {
  // Eliminar todos los cursos existentes
  const deleted = await Curso.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} cursos.`);

  // Crear cursos por defecto
  const cursos = await Curso.insertMany(cursoData.cursos);
  console.log(`Creados ${cursos.length} cursos.`);
}

function askYesNo(questionText) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(questionText, (answer) => {
      rl.close();
      if (answer.toLowerCase() === "yes") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
