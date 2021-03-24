"use strict"
const { hashPass, comparePass } = require("../helpers/bcrypt")

let shop_password = hashPass(`123456`)

let data_products = {
  "2f12710a-f518-48e4-beed-05f5fba81d7a": {
    display_name: "Print Color A3",
    price: 4000,
    description: "Each page, not for full page colors",
  },
  "2f12710a-f518-48e4-beed-05f5fba81d7a": {
    display_name: "Print Black White A3",
    price: 3000,
    description: "Each page, not for full black color",
  },
  "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
    display_name: "Cover A3 softcover",
    price: 8000,
    description: "Using buffalo paper",
  },
  "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
    display_name: "Cover A3 hardcover",
    price: 15000,
    description: "Using thin plywood",
  },
  "786e860c-5d32-405b-95a2-ac065a9012f5": {
    display_name: "Print A4 Color",
    price: 3500,
    description: "Each page, not for full page colors",
  },
  "786e860c-5d32-405b-95a2-ac065a9012f5": {
    display_name: "Print A4 Black White",
    price: 3000,
    description: "Each page, not for full black color",
  },
  "a46b333a-77ae-4234-85f7-7fb5bbb9bfba": {
    display_name: "Cover A4 Softcover",
    price: 7500,
    description: "Using buffalo paper",
  },
  "a46b333a-77ae-4234-85f7-7fb5bbb9bfba": {
    display_name: "Cover A4 Hardcover",
    price: 12000,
    description: "Using thin plywood",
  },
}

let data = [
  {
    email: `printer_me@mail.com`,
    password: shop_password,
    name: `Printer ME`,
    location: `{id: 0, lat: -6.2041139879292135, lng: 106.8042508374194}`,
    // products: data_products,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `mercuane_printer@mail.com`,
    password: shop_password,
    name: `MercuAne Printer`,
    location: `{id: 0, lat: -6.21367608579002, lng: 106.73623643541197}`,
    // products: data_products,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `jaka_printer@mail.com`,
    password: shop_password,
    name: `Jaka Printer`,
    // products: data_products,
    location: `{id: 0, lat: -6.153595345453926, lng: 106.75958047566237}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `kubar_printer@mail.com`,
    password: shop_password,
    name: `Kubar Printer`,
    // products: data_products,
    location: `{id: 0, lat: -6.229305035258377, lng: 106.78892301623551}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `unj_printer@mail.com`,
    password: shop_password,
    name: `UNJ Printer`,
    // products: data_products,
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
