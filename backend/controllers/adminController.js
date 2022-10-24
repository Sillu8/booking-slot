const User = require('../models/userModel');
const Application = require('../models/appModel');
const asyncHandler = require('express-async-handler');


const markAllAsSeen = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.userId});
    const unseenNotifications = user.unseenNotifications;
    user.seenNotifications.push(...unseenNotifications) 
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.json({
        success:true,
        message: 'Marked all as read',
        data: updatedUser
    });
})

const deleteAllNotifications = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.userId});
    user.seenNotifications = [];
    const updatedUser = await user.save()
    updatedUser.password = undefined;
    res.json({
        success:true,
        message: 'Deleted all read notifications',
        data: updatedUser
    });
})


const getUsersList = asyncHandler(async (req,res)=> {
    const userData = await User.find({isAdmin:false});
    res.json({
        success: true,
        userData
    })
});

const getAppsList = asyncHandler(async (req,res)=> {
    const appsData = await Application.find({status:'pending'});
    console.log(appsData);
    res.json({
        success: true,
        appsData
    })
})

module.exports = {
    markAllAsSeen,
    deleteAllNotifications,
    getUsersList,
    getAppsList
}