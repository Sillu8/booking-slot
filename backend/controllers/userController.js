const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Application = require('../models/appModel');


//@desc       Register new user
//@route      POST /signup
//@access     PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please enter all the fields!')
    }


    //Check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log('hello');
        res.status(400)
        throw new Error("An account with this email already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        name, email, password: hashedPassword, phone
    })
    let token = generateToken(user._id);
    if (user) {
        user.password = undefined
        res.json({
            status: 'success',
            token,
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})





//@desc       Authenticate user
//@route      POST /
//@access     PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Check email exists
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        let token = generateToken(user._id);
        res.json({
            status: true,
            token,
        })
    } else {
        res.status(200).json({status: false,message: 'Invalid credentials'})
    }
})




//@desc       Get user data
//@route      GET /user
//@access     PUBLIC
const getUser = (async (req, res) => {
    try {
        const data = await User.findById(req.userId).select('-password').populate('appId');
    res.json({
        status:true,
        data
    })
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error('Some unknown error') 
    }
})



//@desc       Apply for slot
//@route      POST /booking
//@access     PUBLIC
const bookSlot = asyncHandler(async (req, res) => {
    const values = {...req.body.values}
    const data = await Application.create({
        userId: req.userId,
        application: values 
    });
    const admin = await User.findOne({isAdmin: true})
    const unseenNotifications = admin.unseenNotifications;
    unseenNotifications.push({
        type: "new-slot-request",
        message: `${data.application.name} applied for a new slot.`,
        data: {
            appId: data._id,
            name: data.application.name
        },
        onClickPath: '/admin/newApps'
    })
    await User.findByIdAndUpdate(admin._id, {unseenNotifications})
    await User.findOneAndUpdate({_id: req.userId},
        {
            appId: data._id
        })
    res.json({success:true, message:"Success"})
})







//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    bookSlot
}