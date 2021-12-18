'use strict';

// modulo que exporta un middleware

module.exports = (req, res, next) => {
  if (!req.session.usuarioLogado) {
    res.redirect('/login');
    return;
  }

  next();

}