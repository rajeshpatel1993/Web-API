const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



//  /user/signup => POST
router.post('/signup', userController.signup);


module.exports = router;

