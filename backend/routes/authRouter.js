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

// router.post('/admin', adminApp);
module.exports = router;
