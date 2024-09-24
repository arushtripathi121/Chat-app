const express = require('express');
const router = express.Router();
const { testUser } = require('../controllers/testContoller');
const { signUpUser, loginUser, getUserDetailsByToken, logoutUser, updateUser, updateUserProfilePicture, searchUser } = require('../controllers/userController');
const { getMessageBySenderAndReceiverId } = require('../controllers/chatController');
const upload = require('../middlewares/upload');


router.post('/testUser', testUser);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/getUserDetails', getUserDetailsByToken);
router.get('/logout', logoutUser);
router.post('/updateUser', updateUser);
router.post('/searchUser', searchUser);

router.post('/getAllMessages', getMessageBySenderAndReceiverId);




router.post('/updateUserProfilePicture', upload.single('image'), updateUserProfilePicture);
module.exports = router;