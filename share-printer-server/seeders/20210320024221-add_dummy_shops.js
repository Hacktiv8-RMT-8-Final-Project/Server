"use strict"
const { hashPass, comparePass } = require("../helpers/bcrypt")

let shop_password = hashPass(`123456`)

let data = [
  {
    email: `printer@mail.com`,
    password: shop_password,
    name: `Printer`,
    location: `{id: 0, lat: -6.2041139879292135, lng: 106.8042508374194}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `mercuana_printer@mail.com`,
    password: shop_password,
    name: `MercuAna Printer`,
    location: `{id: 0, lat: -6.21367608579002, lng: 106.73623643541197}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `jaka_printer@mail.com`,
    password: shop_password,
    name: `Jaka Printer`,
    location: `{id: 0, lat: -6.153595345453926, lng: 106.75958047566237}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `kubar_printer@mail.com`,
    password: shop_password,
    name: `Kubar Printer`,
    location: `{id: 0, lat: -6.229305035258377, lng: 106.78892301623551}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `unj_printer@mail.com`,
    password: shop_password,
    name: `UNJ Printer`,
    location: `{id: 0, lat: -6.192702113107159, lng: 106.88018509811859}`,
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
    await queryInterface.bulkInsert("Shops", data, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Shops", null, {})
  },
}
