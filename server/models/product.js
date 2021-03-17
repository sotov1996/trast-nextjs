const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
    brend: String,
    logo: String,
    description: String,
    product: String,
    price: Number,
    images: {
        img: String,
        contentType: String
    }
})

module.exports = mongoose.model("Product", Product)