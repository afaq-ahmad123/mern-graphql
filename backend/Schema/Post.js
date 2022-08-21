const { Schema, model } = require("mongoose");


const Post = new Schema({
    username: String,
    content: String,
    createdAt: String,
    comments: [
        {
            username: String,
            content: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', Post);