const BLOG = require('../model/blog');

// Create-Blog

exports.createBlog = async function (req, res, next) {

    try {

        req.body.img = req.file.filename;
        req.body.user = req.userId;
        const createBlog = await BLOG.create(req.body);
        res.status(201).json({
            status: "Success",
            msg: "Blog Create Successfully",
            data: createBlog
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Create Successfully",
            data: error
        })
    }
}


// Get-Blog

exports.getBlog = async function (req, res, next) {

    try {
        const getBlog = await BLOG.find().populate('category').populate('user');
        res.status(200).json({
            status: "Success",
            msg: "Blog get Successfully",
            data: getBlog
        })
    } catch (error) {
        res.status(400).json({
            status: " Fail",
            msg: "Blog not get Successfully",
            data: error
        })
    }
}

// Get-Blog by User

exports.getuserBlog = async function (req, res, next) {

    try {
        const getBlog = await BLOG.find({ user: req.userId }).populate('category').populate('user');
        res.status(200).json({
            status: "Success",
            msg: "User-Blog get Successfully",
            data: getBlog
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User-Blog not get Successfully",
            data: error
        })
    }
}


// Update-Blog

exports.updateBlog = async function (req, res, next) {

    try {

        // req.body.img = req.file.filename;
        // console.log(req.body.img);

        req.body.user = req.userId;
        console.log(req.body.user);

        console.log(req.body);


        // Use req.body.title, req.body.description, etc., for text inputs
        const { title, description, category } = req.body;

        // Use req.file to access the uploaded file (if any)
        const img = req.file;

    

        // Construct the updated blog post object
        const updatedBlog = {
            title,
            description,
            category,
        };

        // If an image was uploaded, add the image file path to the updated blog post
        if (img) {
            updatedBlog.img = img.path; // Assuming Multer stores uploaded files in req.file.path
        }


        const data = await BLOG.findByIdAndUpdate(req.query._id, updatedBlog);
        res.status(200).json({
            status: "Success",
            msg: "Blog Update Successfully",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Update Successfully",
            data: error,
        })
    }
}


// Delete-Blog

exports.deleteBlog = async function (req, res, next) {

    try {
        await BLOG.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "Blog Delete Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Blog not Delete Successfully",
            data: error,
        })
    }
}