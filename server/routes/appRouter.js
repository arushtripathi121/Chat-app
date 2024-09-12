const express = require('express');
const router = express.Router();

const { testUser } = require('../controllers/testContoller');
const { signUpUser, loginUser } = require('../controllers/userController'); 
router.post('/testUser', testUser);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
module.exports = router;