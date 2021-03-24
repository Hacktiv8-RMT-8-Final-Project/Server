if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config()
}
const express = require("express")
const app = express()
// const PORT = process.env.PORT || 3000
const router = require("./routers/router.js")
const errorHandler = require("./middlewares/errorHandler.js")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })

module.exports = app
