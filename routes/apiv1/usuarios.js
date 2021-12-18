"use strict";

const express = require("express");
const router = express.Router();
const Usuario = require("../../models/Usuario");

// GET /apiv1/usuarios
// Devolver usuarios
router.get("/", async (req, res) => {
  const usuario = await Usuario.find({}).populate("courses").exec();
  res.json(usuario);
});

// PUT /apiv1/usuarios/:id
// Actualizar usuario con el curso en el que se inscribe
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const cursoUsuario = req.body;

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { _id: _id },
      cursoUsuario,
      {
        new: true,
      }
    );

    if (!usuarioActualizado) {
      res.status(404).json({ error: "not found" });
      return;
    }

    res.json({ result: usuarioActualizado });
  } catch (err) {
    next(err);
  }
});

// DELETE /apiv1/usuarios/:id
// Elimina un usuario
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Usuario.deleteOne({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
