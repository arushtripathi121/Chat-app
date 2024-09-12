const express = require('express');
const router = express.Router();

const { testUser } = require('../controllers/testContoller');
const { signUpUser } = require('../controllers/userController'); 
router.post('/testUser', testUser);
router.post('/signup', signUpUser);
module.exports = router;