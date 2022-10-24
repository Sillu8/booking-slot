const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {markAllAsSeen, deleteAllNotifications, getUsersList, getAppsList} = require('../controllers/adminController')


router.get('/markAllNotificationAsSeen',protect,markAllAsSeen);
router.get('/deleteReadNotifications',protect,deleteAllNotifications);
router.get('/api/users',protect,getUsersList)
router.get('/api/applications',protect,getAppsList)


module.exports = router