const nodemailer = require('nodemailer')
require("dotenv").config()

const email = process.env.FROM_EMAIL
const password = process.env.FROM_EMAIL_PASS

const sendEmail = async (message) => {
    const transporter = nodemailer.createTransport(
        {
          host: 'smtp.mail.ru',
          port: 465,
          secure: true,
          auth: {
            user: email,
            pass: password
          }
        },
        {
            from: `<${email}>`,
        }
    ) 

    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = sendEmail