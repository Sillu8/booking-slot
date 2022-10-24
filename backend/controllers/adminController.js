const User = require('../models/userModel');
const Application = require('../models/appModel');
const asyncHandler = require('express-async-handler');
const Slot = require('../models/slotModel');


const markAllAsSeen = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    const unseenNotifications = user.unseenNotifications;
    user.seenNotifications.push(...unseenNotifications)
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.json({
        success: true,
        message: 'Marked all as read',
        data: updatedUser
    });
})

const deleteAllNotifications = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    user.seenNotifications = [];
    const updatedUser = await user.save()
    updatedUser.password = undefined;
    res.json({
        success: true,
        message: 'Deleted all read notifications',
        data: updatedUser
    });
})


const getUsersList = asyncHandler(async (req, res) => {
    const userData = await User.find({ isAdmin: false });
    res.json({
        success: true,
        userData
    })
});

const getAppsList = asyncHandler(async (req, res) => {
    const appsData = await Application.find({ status: 'pending' });
    res.json({
        success: true,
        appsData
    })
})

const approveApplication = asyncHandler(async (req, res) => {
    const { _id, status, userId } = req.body;
    const application = await Application.findByIdAndUpdate(_id, {
        status
    });
    const user = await User.findOne({ _id: userId });
    user.unseenNotifications.push({
        type: 'request-approved',
        message: 'Your application request has been approved.',
    })
    await user.save();
    const applications = await Application.find({ status: 'pending' });
    res.json({
        message: 'The application has been approved.',
        success: true,
        data: applications
    })
})

const applicationData = asyncHandler(async (req, res) => {
    const appData = await Application.findOne({ _id: req.params.appId });
    res.json({
        success: true,
        appData
    })
})

const getApprovedApps = asyncHandler(async (req, res) => {
    const appsData = await Application.find({ status: 'approved' });
    res.json({
        success: true,
        appsData
    })
})

const rejectApp = asyncHandler(async (req, res) => {
    const { _id, status, userId } = req.body;
    const application = await Application.findByIdAndUpdate(_id, {
        status
    });
    const user = await User.findOne({ _id: userId });
    user.unseenNotifications.push({
        type: 'request-rejected',
        message: 'Your application has been rejected.',
    })
    await user.save();
    const applications = await Application.find({ status: 'pending' });
    res.json({
        message: 'The application has been approved.',
        success: true,
        data: applications
    })
})

const rejectedApps = asyncHandler(async (req, res) => {
    const appsData = await Application.find({ status: 'rejected' });
    res.json({
        success: true,
        appsData
    })
})

const getSlots = asyncHandler(async (req, res) => {
    const slots = await Slot.find({});
    res.json({
        success: true,
        slots
    })
})

const bookSlot = asyncHandler(async (req, res) => {
    const {slot, id} = req.body;
    const seat = await Slot.findOne({slot});
    seat.appId = id;
    await seat.save();
    const application = await Application.findOne({_id: id});
    application.slot = slot;
    await application.save();
    res.json({
        success: true,
        message: 'Successfully booked the slot.'
    })
})



module.exports = {
    markAllAsSeen,
    deleteAllNotifications,
    getUsersList,
    getAppsList,
    approveApplication,
    applicationData,
    getApprovedApps,
    rejectApp,
    rejectedApps,
    getSlots,
    bookSlot,
}