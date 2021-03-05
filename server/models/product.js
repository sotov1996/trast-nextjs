const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
    brend: String,
    logo: String,
    description: String,
    product: String,
    price: Number
})

module.exports = mongoose.model("Product", Product)