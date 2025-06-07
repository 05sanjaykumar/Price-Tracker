// __backend__/Routes/AuthRoutes.js

const express = require('express');
const router = express.Router();
const {SignInUser, LogInUser} = require('../Controllers/UserController')

router.post('/signin',SignInUser);
router.post('/login', LogInUser);



module.exports = router;