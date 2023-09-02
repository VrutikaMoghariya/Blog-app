const USER = require('../model/users');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


// Register-user

exports.createUser = async function (req, res, next) {

    try {
        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const createUser = await USER.create(req.body);
        const token = jwt.sign({ userId: createUser._id, userEmail: createUser.email }, "RANDOM-TOKEN");

        // return success if the new user is added to the database successfully
        res.status(201).json({
            status: "Success",
            msg: "User Create Successfully",
            data: createUser,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            msg: "User's Creation not Successfully",
            data: error
        })
    }
}

// Login -user

exports.loginUser = async function (req, res, next) {

    try {
        const user = await USER.findOne({ email: req.body.email });

        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {

            //   create JWT token
            const token = jwt.sign({ userId: user._id, userEmail: user.email }, "RANDOM-TOKEN");

            //   return success response
            res.status(200).json({
                status:"Success",
                msg: "Login Successfully",
                email: user.email,
                token: token
            });

        } else {
            res.status(400).json({
                msg: "Passwords does not Match"
            });
        }

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            msg: "User get not Success",
            data: error
        })
    }
}


// get -user

exports.getUser = async function (req, res, next) {

    try {

        const getUser = await USER.find();

        res.status(200).json({
            status: "Success",
            msg: "User get Successfully",
            data: getUser
        })

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "User get not Successfully",
            data: error
        })

    }

}


// update - user

exports.updateUser = async function (req, res, next) {
    try {
        await USER.findByIdAndUpdate(req.query.id, req.body);

        res.status(200).json({
            status: "Success",
            msg: "User Update Successfully",
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Update Successfully",
            data :  error.message
        })
    }
}


// delete - user

exports.deleteUser = async function (req, res, next) {
    try {

        await USER.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status: "Success",
            msg: "User Delete Successfully"
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            msg: "User not Delete Successfully"
        })
    }
}