"use strict"
const { hashPass, comparePass } = require("../helpers/bcrypt")

let user_password = hashPass(`123456`)

let data = [
  {
    email: `user@mail.com`,
    username: `User`,
    password: user_password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  /**
   * @param {import("sequelize").QueryInterface} queryInterface
   * @param {import("sequelize").Sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", data, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
