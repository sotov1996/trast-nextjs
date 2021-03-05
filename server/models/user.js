const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    login: String,
    password: String,
    input: Boolean
})

module.exports = mongoose.model("User", User)