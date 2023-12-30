const express = require('express');

// import { login, register } from '../controllers/authController.js';
// const login = require('../controllers/authController')
// const register = require('../controllers/authController')

const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login',
    login
);

module.exports = router;