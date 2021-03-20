// const request = require('supertest')
// const app = require('../app')
// const {sequelize} = require('../models')
// const access_token = require('./shops.test')

// afterAll((done) => {
//   sequelize.close()
//   done()
// })

// let orderId
// describe('GET /shop/order_lists', function() {
//   it('should return status 200 with data', function(done) {
//     request(app)
//       .put('/shop/order_lists')
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(res.body).toHaveProperty('data')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(Array.isArray(res.body.data)).toEqual(true)
//         expect(res.body.msg).toEqual('Successfully read all orders that not completed')
//         expect(res.body.data[0]).toHaveProperty('id')
//         expect(res.body.data[0]).toHaveProperty('order_number')
//         expect(res.body.data[0]).toHaveProperty('order_content')
//         expect(res.body.data[0]).toHaveProperty('files_url')
//         expect(res.body.data[0]).toHaveProperty('order_price')
//         expect(res.body.data[0]).toHaveProperty('shop_Id')
//         expect(res.body.data[0]).toHaveProperty('email_user')
//         expect(res.body.data[0]).toHaveProperty('payment_status')
//         expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
//         expect(res.body.data[0]).toHaveProperty('createdAt')
//         expect(res.body.data[0]).toHaveProperty('updatedAt')
//         expect(typeof res.body.data[0].id).toEqual('number')
//         orderId = res.body.data[0].id
//         expect(typeof res.body.data[0].order_number).toEqual('string')
//         expect(typeof res.body.data[0].order_content).toEqual('object')
//         expect(typeof res.body.data[0].files_url).toEqual('string')
//         expect(typeof res.body.data[0].order_price).toEqual('number')
//         expect(typeof res.body.data[0].shop_Id).toEqual('number')
//         expect(typeof res.body.data[0].email_user).toEqual('string')
//         expect(typeof res.body.data[0].payment_status).toEqual('number')
//         expect(typeof res.body.data[0].createdAt).toEqual('string')
//         expect(typeof res.body.data[0].updatedAt).toEqual('string')

//         done();
//       });
//   });
// });

// describe('PATCH /shop/order_lists/:id', function() {
//   it('should return status 200 with data', function(done) {
//     const body = {
//       payment_status: 5
//     }
//     request(app)
//       .put(`/shop/order_lists/${orderId}`)
//       .set('access_token', access_token)
//       .send(body)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(res.body).toHaveProperty('data')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(typeof res.body.data).toEqual('object')
//         expect(res.body.msg).toEqual('Successfully updated status order')
//         expect(res.body.data).toHaveProperty('id')
//         expect(res.body.data).toHaveProperty('order_number')
//         expect(res.body.data).toHaveProperty('order_content')
//         expect(res.body.data).toHaveProperty('files_url')
//         expect(res.body.data).toHaveProperty('order_price')
//         expect(res.body.data).toHaveProperty('shop_Id')
//         expect(res.body.data).toHaveProperty('email_user')
//         expect(res.body.data).toHaveProperty('payment_status')
//         expect(res.body.data).toHaveProperty('proof_receipt_transaction')
//         expect(res.body.data).toHaveProperty('createdAt')
//         expect(res.body.data).toHaveProperty('updatedAt')
//         expect(typeof res.body.data.id).toEqual('number')
//         expect(typeof res.body.data.order_number).toEqual('string')
//         expect(typeof res.body.data.order_content).toEqual('object')
//         expect(typeof res.body.data.files_url).toEqual('string')
//         expect(typeof res.body.data.order_price).toEqual('number')
//         expect(typeof res.body.data.shop_Id).toEqual('number')
//         expect(typeof res.body.data.email_user).toEqual('string')
//         expect(typeof res.body.data.payment_status).toEqual('number')
//         expect(typeof res.body.data.createdAt).toEqual('string')
//         expect(typeof res.body.data.updatedAt).toEqual('string')

//         done();
//       });
//   });
//   it('should return error message', function(done) {
//     const body = {
//       payment_status: 5
//     }
//     request(app)
//       .put(`/shop/order_lists/`)
//       .set('access_token', access_token)
//       .send(body)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(res.body.msg).toEqual('Data not found')

//         done();
//       });
//   });
//   it('should return error message', function(done) {
//     const body = {
//       payment_status: 5
//     }
//     request(app)
//       .put(`/shop/order_lists/`)
//       .set('access_token', 'qwerty')
//       .send(body)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(401)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(res.body.msg).toEqual('Invalid token found')

//         done();
//       });
//   });
// });

// describe('GET /shop/transaction_history', function() {
//   it('should return status 200 with data', function(done) {
//     request(app)
//       .put(`/shop/transaction_history`)
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(res.body).toHaveProperty('data')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(Array.isArray(res.body.data)).toEqual(true)
//         expect(res.body.msg).toEqual('Successfully read all orders that not completed')
//         expect(res.body.data[0]).toHaveProperty('id')
//         expect(res.body.data[0]).toHaveProperty('order_number')
//         expect(res.body.data[0]).toHaveProperty('order_content')
//         expect(res.body.data[0]).toHaveProperty('files_url')
//         expect(res.body.data[0]).toHaveProperty('order_price')
//         expect(res.body.data[0]).toHaveProperty('shop_Id')
//         expect(res.body.data[0]).toHaveProperty('email_user')
//         expect(res.body.data[0]).toHaveProperty('payment_status')
//         expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
//         expect(res.body.data[0]).toHaveProperty('createdAt')
//         expect(res.body.data[0]).toHaveProperty('updatedAt')
//         expect(typeof res.body.data[0].id).toEqual('number')
//         expect(typeof res.body.data[0].order_number).toEqual('string')
//         expect(typeof res.body.data[0].order_content).toEqual('object')
//         expect(typeof res.body.data[0].files_url).toEqual('string')
//         expect(typeof res.body.data[0].order_price).toEqual('number')
//         expect(typeof res.body.data[0].shop_Id).toEqual('number')
//         expect(typeof res.body.data[0].email_user).toEqual('string')
//         expect(typeof res.body.data[0].payment_status).toEqual('number')
//         expect(typeof res.body.data[0].createdAt).toEqual('string')
//         expect(typeof res.body.data[0].updatedAt).toEqual('string')

//         done();
//       });
//   });
//   it('should return status 401 with data', function(done) {
//     request(app)
//       .put(`/shop/transaction_history`)
//       .set('access_token', 'qwerty')
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(401)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('msg')
//         expect(typeof res.body.msg).toEqual('string')
//         expect(res.body.msg).toEqual('Invalid token found')

//         done();
//       });
//   });
// });