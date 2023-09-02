const BLOG = require('../model/blog');

// create

exports.createBlog = async function (req, res, next) {

    try {
        console.log(req.body);
        const createBlog = await BLOG.create(req.body);

        res.status(201).json({
            status: "Success",
            msg: "Blog Create Successfully",
            data: createBlog
        })

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Blog Creation not Successfully",
            data: error
        })

    }

}


// read

exports.getBlog = async function (req, res, next) {

    try {

        const getBlog = await BLOG.find().populate('category');

        res.status(200).json({
            status: "Success",
            msg: "Blog get Successfully",
            data: getBlog
        })

    } catch (error) {

        res.status(400).json({
            status: " Fail",
            msg: "Blog get not Successfully",
            data: error
        })

    }

}


// update

exports.updateBlog = async function (req, res, next) {
    try {
        await BLOG.findByIdAndUpdate(req.query._id, req.body);

        res.status(200).json({
            status: "Success",
            msg: "Blog Update Successfully",
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: error,
        })
    }
}


// delete

exports.deleteBlog = async function (req, res, next) {
    try {

        await BLOG.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "Blog DELETE Successfully",
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            msg: error,
        })
    }
}