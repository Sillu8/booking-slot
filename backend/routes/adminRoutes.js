const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {markAllAsSeen, bookSlot, getSlots, rejectedApps, deleteAllNotifications, getUsersList, getAppsList, approveApplication, applicationData, getApprovedApps, rejectApp} = require('../controllers/adminController')


router.get('/markAllNotificationAsSeen',protect,markAllAsSeen);
router.get('/deleteReadNotifications',protect,deleteAllNotifications);
router.get('/api/users',protect,getUsersList);
router.get('/api/applications',protect,getAppsList);
router.post('/approveApplication',protect,approveApplication);
router.get('/application/:appId',protect,applicationData)
router.get('/api/approved-applications',protect,getApprovedApps)
router.post('/reject-app',protect,rejectApp);
router.get('/rejected-apps',protect,rejectedApps);
router.get('/api/slots',protect,getSlots);
router.post('/bookslot',protect,bookSlot);



module.exports = router