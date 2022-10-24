const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {registerUser, loginUser, getUser, bookSlot} = require('../controllers/userController');



router.post('/signup',registerUser);
router.post('/',loginUser);
router.get('/home', protect, getUser);
router.post('/booking', protect,bookSlot)



module.exports = router