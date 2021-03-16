const express = require('express')
const next = require('next')
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const path = require('path')

mongoose.connect(process.env.DB_HOST, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.prepare().then(() => {
  const server = express()

  server.use(express.static('assets'))
  server.use('/assets', express.static(path.join(__dirname, 'assets')))

  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(cors())

  server.use("/api", require("./server/routes/product"))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})