const BLOG = require('../model/blog');

// create

exports.createBlog = async function (req, res, next) {

    try {
        console.log(req.body);
        req.body.user = req.userId
        req.body.img = req.file.filename
        const createBlog = await BLOG.create(req.body);

        res.status(201).json({
            status: "success",
            msg: "Blog Creation Successfully",
            data: createBlog
        })

    } catch (error) {

        res.status(400).json({
            status: "Creation Fail",
            msg: "Blog Creation not Success",
            data: error
        })

    }

}


// read

exports.getBlog = async function (req, res, next) {

    try {

        const getBlog = await BLOG.find().populate('category');

        res.status(200).json({
            status: "success",
            msg: "Blog get Successfully",
            data: getBlog
        })

    } catch (error) {

        res.status(400).json({
            status: "reading Fail",
            msg: "Blog get not Success",
            data: error
        })

    }

}

// read by user

exports.getuserBlog = async function (req, res, next) {

    try {

        const getBlog = await BLOG.findById(req.userId);

        res.status(200).json({
            status: "success",
            msg: "Blog get Successfully",
            data: getBlog
        })

    } catch (error) {

        res.status(400).json({
            status: "reading Fail",
            msg: "Blog get not Success",
            data: error
        })

    }

}


// update

exports.updateBlog = async function (req, res, next) {
    try {
        await BLOG.findByIdAndUpdate(req.query._id, req.body);

        res.status(200).json({
            status: "success",
            message: "Blog Update successful",
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        })
    }
}


// delete

exports.deleteBlog = async function (req, res, next) {
    try {

        await BLOG.findByIdAndDelete(req.query._id);

        res.status(200).json({
            status: "success",
            message: "Blog DELETE successful",
        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        })
    }
}