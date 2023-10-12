var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../middleware/auth');
var userController = require('../controller/users');
const USER = require('../model/users');
const jwt = require('jsonwebtoken');


/*_______________________________  User Authentication ___________________________________ */


/******  User Register ******/

router.post('/register', userController.createUser);


/****** User Login  ******/

router.post('/login', userController.loginUser);


/******  Get  ******/

router.get('/get-user', userController.getUser);


/******  Update ******/

router.post('/update-user', userController.updateUser);


/******  Delete ******/

router.delete('/delete-user', userController.deleteUser);


/******  Google login ******/


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Generate a JWT token and redirect to your frontend with the token
        const token = jwt.sign({ userId: req.user._id }, 'Just-for-re-varify');
        res.redirect(`http://localhost:3000/gmail/login?token=${token}`);
    });

router.get('/auth/google/revarify', auth , async (req, res, next) => {
    try {
       
        let checkUser = await USER.findById(req.userId);

        if (!checkUser) {
            throw { status: 401, message: "user not found" };
        }

        res.status(200).json({ message: 'User reverified successfully', token, data: checkUser });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});


module.exports = router;