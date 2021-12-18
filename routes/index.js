var express = require("express");
var router = express.Router();

const Curso = require("../models/Curso");

/* GET home page. */
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
    res.render("index", { title: "OhMyCode", cursos });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
