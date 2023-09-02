const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    // user: 
});

const BLOG = mongoose.model('blog', blogSchema);

module.exports = BLOG;