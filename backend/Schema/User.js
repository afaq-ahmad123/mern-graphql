const { Schema, model } = require("mongoose");


const User = new Schema({
    username: String,
    password: String, 
    email: String,
    createdAt: String
});

module.exports = model('User', User);