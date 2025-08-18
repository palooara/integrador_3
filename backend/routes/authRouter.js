const express = require('express');
const router = express.Router();
const {
  registrar,
  login,
  //adminApp,
  logout
} = require('../controllers/authController');

router.post('/login', login);

router.post('/registro', registrar);

router.post('/logout', logout);

router.get("/me", (req, res) => {
  if (req.session.usuario) {
    return res.json({ nombre: req.session.usuario.nombre, role: req.session.usuario.role });
  } else {
    return res.status(401).json({ error: "No logueado" });
  }
});

// router.post('/admin', adminApp);
module.exports = router;
