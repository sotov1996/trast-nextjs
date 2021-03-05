const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Brend = new Schema({
    brend: String,
    logo: String,
    description: String
})

module.exports = mongoose.model("Brend", Brend)