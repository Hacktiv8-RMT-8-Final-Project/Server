//@ts-check
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})
