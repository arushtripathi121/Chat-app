const express = require('express');
const router = express.Router();

const { testUser } = require('../controllers/testContoller');
const { signUpUser, loginUser, getUserDetailsByToken, logoutUser, updateUser } = require('../controllers/userController'); 
router.post('/testUser', testUser);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getUserDetails', getUserDetailsByToken);
router.get('/logout', logoutUser);
router.post('/updateUser', updateUser);
module.exports = router;