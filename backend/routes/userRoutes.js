const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {registerUser, loginUser, getUser} = require('../controllers/userController');



router.post('/signup',registerUser);
router.post('/',loginUser);
router.get('/home', protect, getUser);




module.exports = router