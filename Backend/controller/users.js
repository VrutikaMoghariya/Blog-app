const USER = require('../model/users');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Create-User

exports.createUser = async function (req, res, next) {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);  // hash the password

        const createUser = await USER.create(req.body);
        const token = jwt.sign({ userId: createUser._id }, "RANDOM-TOKEN");

        // return success if the new user is added to the database successfully
        res.status(201).json({
            status: "Success",
            msg: "User Create Successfully",
            data: createUser,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Create Successfully",
            data: error
        })
    }
}

// Login-User

exports.loginUser = async function (req, res, next) {

    try {
        const user = await USER.findOne({ email: req.body.email });

        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, "RANDOM-TOKEN");     // create JWT token
            res.status(200).json({                                          //return success response
                status: "Success",
                msg: "User Login Successfully",
                email: user.email,
                token: token
            });
        } else {
            res.status(400).json({
                msg: "Password does not Match"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Found",
            data: error
        })
    }
}


exports.loginWithGmail = async function (req, res, next) {
    try {
        passport.use(new GoogleStrategy({
            clientID: '807127153-ulrsjnqco1f5ja0qt1u6cqo4gmhr361e.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
        }, async (accessToken, refreshToken, profile, done) => {
            // Check if the user already exists in the database
            let user = await USER.findOne({ email: profile.id });
            console.log(user);

            if (!user) {
                // If the user doesn't exist, create a new user in the database
                user = new USER({
                    email: profile.id,
                    name: profile.displayName,
                });
                await user.save();

            }


            return done(null, user);
        }));

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            const user = await USER.findById(id);
            done(null, user);
        });


    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Fail Log in with Gmail",
            data: error
        })
    }
}

// Get - User

exports.getUser = async function (req, res, next) {

    try {
        const getUser = await USER.find();
        res.status(200).json({
            status: "Success",
            msg: "User get Successfully",
            data: getUser
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not get Successfully",
            data: error
        });
    }
}


// Update - User

exports.updateUser = async function (req, res, next) {

    try {
        await USER.findByIdAndUpdate(req.query._sid, req.body);
        res.status(200).json({
            status: "Success",
            msg: "User Update Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Update Successfully",
            data: error
        })
    }
}


// Delete - User

exports.deleteUser = async function (req, res, next) {
    try {
        await USER.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "User Delete Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Delete Successfully",
            data: error,
        })
    }
}