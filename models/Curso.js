"use strict";

const mongoose = require("mongoose");

// Definición del Esquema
const cursoSchema = mongoose.Schema(
  {
    ref_course: { type: String, index: true },
    date_creation: { type: Date, default: Date.now },
    title: { type: String, index: true },
    lessons: [String],
    links: [String],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    collection: "cursos",
  }
);

cursoSchema.statics.lista = function (filtro, limit, skip, fields, sort) {
  const query = Curso.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

// creamos el modelo con el esquema definido
const Curso = mongoose.model("Curso", cursoSchema);

// exportamos el modelo
module.exports = Curso;
