const express = require('express');
const router = express.Router();
const { testUser } = require('../controllers/testContoller');
const { signUpUser, loginUser, getUserDetailsByToken, logoutUser, updateUser, updateUserProfilePicture } = require('../controllers/userController');
const upload = require('../middlewares/upload');


router.post('/testUser', testUser);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getUserDetails', getUserDetailsByToken);
router.get('/logout', logoutUser);
router.post('/updateUser', updateUser);

router.post('/updateUserProfilePicture', upload.single('image'), updateUserProfilePicture);
module.exports = router;