const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require("../models/userModel")

const {register, current, login, regisertUser, LoginUser, currentUser, tokenGen} = require("../controllers/userControllers");
const validateToken = require("../middleware/ValidateToken");



router.post('/register',regisertUser);

router.post('/login', LoginUser);

router.get("/current", validateToken, currentUser);

router.get('/token', tokenGen)



module.exports = router;
