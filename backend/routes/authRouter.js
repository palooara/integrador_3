const express = require('express');
const router = express.Router();
const {
  registrar,
  login,
  logout
} = require('../controllers/authController');

router.post('/login', login);

router.post('/registro', registrar);

router.get('/logout', logout);

module.exports = router;
