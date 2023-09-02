const ADMIN = require('../model/admin');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


// Register- Admin

exports.createAdmin = async function (req, res, next) {

    try {

        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const createAdmin = await ADMIN.create(req.body);
        const token = jwt.sign({ adminId: createAdmin._id, adminEmail: createAdmin.email }, "RANDOM-TOKEN");

        // return success if the new ADMIN is added to the database successfully
        res.status(201).json({
            status: "success",
            msg: "ADMIN Creation Successfully",
            data: createAdmin,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            status: "Creation Fail",
            msg: "ADMIN Creation not Success",
            data: error
        })
    }
}


exports.loginAdmin = async function (req, res, next) {

    try {
        const admin = await ADMIN.findOne({ email: req.body.email });

        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, admin.password);

        if (isMatch) {

            //   create JWT token
            const token = jwt.sign({ adminId: admin._id, adminEmail: admin.email }, "RANDOM-TOKEN");

            //   return success response
            res.status(200).send({
                msg: "Login Successful",
                email: admin.email,
                token,
            });

        } else {
            res.status(400).send({
                msg: "Passwords does not match"
            });
        }

    } catch (error) {
        res.status(404).send({
            msg: "admin not found"
        });
    }
}
