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
            status: "success",
            msg: "user Creation Successfully",
            data: createUser,
            token : token
        })

    } catch (error) {
        res.status(500).json({
            status: "Creation Fail",
            msg: "user Creation not Success",
            data: error
        })
    }
}


exports.loginUser = async function (req, res, next) {

    try {
        const user = await USER.findOne({ email: req.body.email });

        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {

            //   create JWT token
            const token = jwt.sign({ userId: user._id, userEmail: user.email }, "RANDOM-TOKEN");

            //   return success response
            res.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
            });

        } else {
            res.status(400).send({
                message: "Passwords does not match"
            });
        }

    } catch (error) {
        res.status(404).send({
            message: "User not found"
        });
    }
}



// read

// exports.getUser = async function (req, res, next) {

//     try {

//         const getUser = await USER.find();

//         res.status(200).json({
//             status: "success",
//             msg: "USER get Successfully",
//             data: getUser
//         })

//     } catch (error) {

//         res.status(400).json({
//             status: "reading Fail",
//             msg: "USER get not Success",
//             data: error
//         })

//     }

// }


// update

// exports.updateUser = async function (req, res, next) {
//     try {
//         await USER.findByIdAndUpdate(req.query.id, req.body);

//         res.status(200).json({
//             status: "success",
//             message: "USER Update successful",
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message,
//         })
//     }
// }


// delete

// exports.deleteUser = async function (req, res, next) {
//     try {

//         await USER.findByIdAndDelete(req.query.id);

//         res.status(200).json({
//             status: "success",
//             message: "USER DELETE successful",
//         })

//     } catch (error) {
//         res.status(404).json({
//             status: "fail",
//             message: error.message,
//         })
//     }
// }