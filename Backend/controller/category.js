const CATEGORY = require('../model/category');

// create

exports.createCategory = async function (req, res, next) {

    try {

        const createCategory = await CATEGORY.create(req.body);
        res.status(201).json({
            status: "success",
            msg: "category Creation Successfully",
            data: createCategory
        })

    } catch (error) {

        res.status(404).json({
            status: "Creation Fail",
            msg: "category Creation not Success",
            data: error
        })

    }

}


// read

exports.getCategory = async function (req, res, next) {

    try {

        const getCategory = await CATEGORY.find();

        res.status(201).json({
            status: "success",
            msg: "category get Successfully",
            data: getCategory
        })

    } catch (error) {

        res.status(400).json({
            status: "reading Fail",
            msg: "category get not Success",
            data: error
        })

    }

}


// update


exports.updateCategory = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndUpdate(req.query.id, req.body);

        res.status(200).json({
            status: "success",
            message: "category Update successful",
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        })
    }
}


// delete

exports.deleteCategory = async function (req, res, next) {
    try {

        await CATEGORY.findByIdAndDelete(req.query.id);

        res.status(200).json({
            status: "success",
            message: "category DELETE successful",
        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        })
    }
}