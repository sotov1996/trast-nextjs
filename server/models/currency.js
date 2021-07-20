const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Currency = new Schema({
    RUB: Number,
    BLR: Number
})

module.exports = mongoose.model("Currency", Currency)