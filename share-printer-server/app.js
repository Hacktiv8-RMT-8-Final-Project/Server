//@ts-check
require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

const router = require("./routers")
const errorHandler = require("./middlewares/ErrorHandler.js")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})

module.exports = app
