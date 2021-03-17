const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const User = require("../models/user")
const Brend = require("../models/brend")
const sendEmail = require("../services/servicesEmail")
const multer = require('multer');
require("dotenv").config()
var fs = require('fs');
var path = require('path');

router.get("/", async (req, res) => {
    try {
        const product = await Product.find({})
        res.send(product)
    } catch (e) {
        console.log(e)
    }
})

router.get("/login", async (req, res) => {
    try {
        const user = await User.find(
            {
                login: req.query.login,
                password: req.query.password
            }
        )
        if (!user.length) {
            res.send("error")
        } else {
            res.send("success")
        }
    } catch (e) {
        console.log(e)
    }
})

router.get("/verefikation", async (req, res) => {
    try{
        const user = await User.find({})
        res.send(user)
    }catch (e) {
        console.log(e)
    }
})

router.post("/feedback", async (req, res) => {
    try {
        const message = {
            to: process.env.TO_EMAIL,
            subject: req.body.title,
            text: req.body.description
        }
        await sendEmail(message)
        res.send("Send message")
    } catch (e) {
        console.log(e)
    }
})

const storage = multer.diskStorage({
    destination: 'assets/img',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage });

router.post("/add", upload.single('logo'), async (req, res) => {
    const thumb = new Buffer(fs.readFileSync(path.join(__dirname + '../../../assets/img/' + req.file.filename))).toString('base64')
    try {
        const product = new Product({
            brend: req.body.brend,
            price: req.body.price,
            description: req.body.description,
            product: req.body.product,
            logo: req.file.filename,
            images: {
                img: thumb, 
                contentType: req.file.mimetype
            }
        })

        await product.save()
            .then(() => res.send(product))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (e) {
        res.send("error")
    }
});

router.put("/update", upload.single('logo'), async (req, res) => {
    try {
        const thumb = new Buffer(fs.readFileSync(path.join(__dirname + '../../../assets/img/' + req.file.filename))).toString('base64')
        let reqProduct = {}
        if (!req.file) {
            reqProduct = {
                brend: req.body.brend,
                price: req.body.price,
                description: req.body.description,
                product: req.body.product
            }
        } else {
            reqProduct = {
                brend: req.body.brend,
                price: req.body.price,
                description: req.body.description,
                product: req.body.product,
                logo: req.file.filename,
                images: {
                    img: thumb, 
                    contentType: req.file.mimetype
                }
            }
        }

        const updateProd = await Product.updateOne({ _id: req.body.id }, reqProduct, { upsert: true })

        res.send(reqProduct)
        reqProduct = {}
    } catch (e) {
        res.send("error")
        console.log(e)
    }
});

router.post("/add-brend", upload.single('logo'), async (req, res) => {
    try {
        const thumb = new Buffer(fs.readFileSync(path.join(__dirname + '../../../assets/img/' + req.file.filename))).toString('base64')
        const brend = new Brend({
            brend: req.body.brend,
            description: req.body.description,
            logo: req.file.filename,
            /*img: {
                data: fs.readFileSync(path.join(__dirname + '../../../assets/img/' + req.file.filename)),
                contentType: req.file.mimetype
            },*/
            images: {
                img: thumb, 
                contentType: req.file.mimetype
            }
        })

        await brend.save()
            .then(() => res.send(brend))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (e) {
        res.send("error")
        console.log(e)
    }
});

router.put("/update-brend", upload.single('logo'), async (req, res) => {
    try {
        const thumb = new Buffer(fs.readFileSync(path.join(__dirname + '../../../assets/img/' + req.file.filename))).toString('base64')
        let reqProduct = {}
        if (!req.file) {
            reqProduct = {
                brend: req.body.brend,
                description: req.body.description
            }
        } else {
            reqProduct = {
                brend: req.body.brend,
                description: req.body.description,
                logo: req.file.filename,
                images: {
                    img: thumb, 
                    contentType: req.file.mimetype
                }
            }
        }

        const updateBrend = await Brend.updateOne({ _id: req.body.id }, reqProduct, { upsert: true })
        res.send(reqProduct)
        reqProduct = {}
    } catch (e) {
        res.send("error")
        console.log(e)
    }
});

router.get("/delete-brend/:id", async (req, res) => {
    try {
        await Brend.findOneAndDelete({ _id: req.params.id });
        const brend = await Brend.find({})
        res.send(brend)
    } catch (e) {
        res.send("error")
        console.log(e)
    }
})
router.get("/delete/:id", async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        const product = await Product.find({})
        res.send(product)
    } catch (e) {
        res.send("error")
        console.log(e)
    }
})

router.get("/adminBrend", async (req, res) => {
    try {
        const product = await Product.find({})
        const brend = await Brend.find({})
        let obj = {}
        brend.forEach(el => obj[el.brend] = [])
        product.forEach((el) => ++obj[el.brend])
        res.send([brend, obj])
    } catch (e) {
        res.send("error")
        console.log(e)
    }
})

router.get("/:brend", async (req, res) => {
    try {
        const product = await Product.find({ brend: req.params.brend })
        res.send(product)
    } catch (error) {
        res.send("error")
        console.log(error)
    }
})
router.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id })
        res.send(product)
    } catch (error) {
        res.send("error")
        console.log(error)
    }
})


module.exports = router;