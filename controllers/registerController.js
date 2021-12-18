"use strict";

const express = require("express");
const registerRouter = express.Router();
const Usuario = require("../models/Usuario");

registerRouter.post("/", async (req, res, next) => {
  try {
    const { name, email, password, exp, courses } = req.body;

    const passwordHash = await Usuario.hashPassword(password);

    const user = new Usuario({
      name,
      email,
      passwordHash,
      exp,
      courses,
    });

    const savedUser = await user.save();

    // res.json(savedUser);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      savedUser,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = registerRouter;
