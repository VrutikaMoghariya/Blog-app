const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    }
});

const CATEGORY = mongoose.model('category', categorySchema);

module.exports = CATEGORY;
