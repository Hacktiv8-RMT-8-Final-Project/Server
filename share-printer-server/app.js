if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
}
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const errHandler = require('./middlewares/errorHandler')
const router = require('./routers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errHandler)

module.exports = app