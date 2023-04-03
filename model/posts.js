const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('AddPost', PostSchema)