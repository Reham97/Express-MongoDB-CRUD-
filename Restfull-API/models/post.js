const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    body: {
        type: String,
        required: 'This field is required.'
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});


mongoose.model('Post', postSchema);