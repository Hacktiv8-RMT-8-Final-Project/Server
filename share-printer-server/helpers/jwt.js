//@ts-check
const jwt = require("jsonwebtoken")

function generateToken(payload) {
  console.log(payload, 'ini payload');
  console.log(process.env.JWT_SECRET, 'ini env jwt');
  return jwt.sign(payload, process.env.JWT_SECRET)
}

function decoded(payload) {
  return jwt.decode(payload, { complete: true })
}

module.exports = { generateToken, decoded }
