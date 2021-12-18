"use strict";

const express = require("express");
const router = express.Router();
const Curso = require("../../models/Curso");

// GET /apiv1/cursos
// Devuelve una lista de cursos
router.get("/", async (req, res, next) => {
  try {
    const ref_course = req.query.ref_course;
    const title = req.query.title;
    const lessons = req.query.lessons;
    const date_creation = req.query.date_creation;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;

    const filtro = {};

    if (ref_course) {
      filtro.ref_course = ref_course;
    }

    if (title) {
      filtro.title = title;
    }

    if (lessons) {
      filtro.lessons = lessons;
    }

    if (date_creation) {
      filtro.date_creation = date_creation;
    }

    const cursos = await Curso.lista(filtro, skip, limit, select, sort);
    res.json({ results: cursos });
  } catch (err) {
    next(err);
  }
});

// GET /apiv1/cursos:id
// Obtener un curso
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    const curso = await Curso.find({ _id: _id });
    res.json({ result: curso });
  } catch (err) {
    next(err);
  }
});

// GET /apiv1/cursos/referencia
// Filtrar por rango de precios
router.get("/referencia/:ref_course", async (req, res, next) => {
  try {
    const referencia = req.params.ref_course;

    const curso = await Curso.find({ ref_course: referencia });
    res.json({ result: curso });
  } catch (err) {
    next(err);
  }
});

// POST /apiv1/cursos
// Crear un curso
router.post("/", async (req, res, next) => {
  try {
    const cursoData = req.body;
    // cursoData.foto = req.file.originalname;

    // thumbnailController(cursoData.foto);
    const curso = new Curso(cursoData);

    const cursoCreado = await curso.save();

    return res.status(201).json({
      message: "Curso creado correctamente",
      cursoCreado,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /apiv1/cursos:id
// Actualizar un curso con usuario que se inscribe
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const cursoData = req.body;

    const cursoActualizado = await Curso.findOneAndUpdate(
      { _id: _id },
      cursoData,
      {
        new: true,
      }
    );

    if (!cursoActualizado) {
      res.status(404).json({ error: "not found" });
      return;
    }

    res.json({ result: cursoActualizado });
  } catch (err) {
    next(err);
  }
});

// DELETE /apiv1/cursos/:id
// Elimina un curso
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Curso.deleteOne({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
