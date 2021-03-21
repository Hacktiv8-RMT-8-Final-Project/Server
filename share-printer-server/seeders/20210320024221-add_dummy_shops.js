"use strict"
const { hashPass, comparePass } = require("../helpers/bcrypt")

let shop_password = hashPass(`123456`)

let data = [
  {
    email: `printer@mail.com`,
    password: shop_password,
    name: `Printer`,
    location: `{id: 0, lat: -6.2041139879292135, lng: 106.8042508374194}`,
    // products: [
    //   {
    //     "99f15689-6cb2-4ae0-a7b3-4e5b33a6900c": {
    //       display_name: "Jilid - A3",
    //       price: 5000,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "2f12710a-f518-48e4-beed-05f5fba81d7a": {
    //       display_name: "Print Warna A3 (Per Halaman)",
    //       price: 2000,
    //       description: "not for full page colors",
    //     },
    //   },
    //   {
    //     "a46b333a-77ae-4234-85f7-7fb5bbb9bfba": {
    //       display_name: "Jilid - A4",
    //       price: 8000,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "786e860c-5d32-405b-95a2-ac065a9012f5": {
    //       display_name: "Print Warna A4 (Per Halaman)",
    //       price: 3000,
    //       description: "not for full page colors",
    //     },
    //   },
    // ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `mercuana_printer@mail.com`,
    password: shop_password,
    name: `MercuAna Printer`,
    location: `{id: 0, lat: -6.21367608579002, lng: 106.73623643541197}`,
    // products: [
    //   {
    //     "5c82af66-c5db-413e-a965-752667c2bb60": {
    //       display_name: "Jilid - A3",
    //       price: 4000,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "072def69-f9dc-48c5-87da-9afe560ebe1c": {
    //       display_name: "Print Warna A3 (Per Halaman)",
    //       price: 1000,
    //       description: "not for full page colors",
    //     },
    //   },
    //   {
    //     "d69728f2-c7f9-4105-80c8-811bf4cb5df4": {
    //       display_name: "Jilid - A4",
    //       price: 7000,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "bca82df9-8709-4b2d-9cec-b763e0f5ac00": {
    //       display_name: "Print Warna A4 (Per Halaman)",
    //       price: 2000,
    //       description: "not for full page colors",
    //     },
    //   },
    // ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: `jaka_printer@mail.com`,
    password: shop_password,
    name: `Jaka Printer`,
    // products: [
    //   {
    //     "4c094e76-e949-42a6-a68f-17161a945e83": {
    //       display_name: "Jilid - A3",
    //       price: 5500,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "2cff39f5-5ffd-4ee1-8840-1a6354fca889": {
    //       display_name: "Print Warna A3 (Per Halaman)",
    //       price: 1500,
    //       description: "not for full page colors",
    //     },
    //   },
    //   {
    //     "ad36c71f-9bde-41a1-8c1d-3b8c00b7ed89": {
    //       display_name: "Jilid - A4",
    //       price: 7500,
    //       description: "softcover",
    //     },
    //   },
    //   {
    //     "0301d458-e33f-4b1e-8f0a-89fb298dea28": {
    //       display_name: "Print Warna A4 (Per Halaman)",
    //       price: 2500,
    //       description: "not for full page colors",
    //     },
    //   },
    // ],
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
