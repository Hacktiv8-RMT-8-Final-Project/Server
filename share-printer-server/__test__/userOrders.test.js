const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { generateToken } = require('../helpers/jwt');
const orderId = require('./shopOrders.test')
const access_token = generateToken({
  id: 39,
  email: 'user@mail.com'
})

let shopId = 55



describe('POST /user/form', function() {
  it('should return status 200 with data', function(done) {
    const body = {
      order_content: { "data" : "requirement printing options" },
      file_url: 'https://dummy.downloadlink.here',
      shop_id: shopId
    }
    request(app)
      .post(`/user/form`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(Array.isArray(res.body.data)).toEqual(true)
        expect(res.body.msg).toEqual('Your order has been successfully created')
        expect(res.body.data[0]).toHaveProperty('payment_status')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('order_number')
        expect(res.body.data[0]).toHaveProperty('order_content')
        expect(res.body.data[0]).toHaveProperty('files_url')
        expect(res.body.data[0]).toHaveProperty('order_price')
        expect(res.body.data[0]).toHaveProperty('shop_Id')
        expect(res.body.data[0]).toHaveProperty('email_user')
        expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
        expect(res.body.data[0]).toHaveProperty('createdAt')
        expect(res.body.data[0]).toHaveProperty('updatedAt')
        expect(typeof res.body.data[0].id).toEqual('number')
        expect(typeof res.body.data[0].order_number).toEqual('string')
        expect(typeof res.body.data[0].order_content).toEqual('object')
        expect(typeof res.body.data[0].files_url).toEqual('string')
        expect(typeof res.body.data[0].order_price).toEqual('number')
        expect(typeof res.body.data[0].shop_Id).toEqual('number')
        expect(typeof res.body.data[0].email_user).toEqual('string')
        expect(typeof res.body.data[0].payment_status).toEqual('number')
        expect(typeof res.body.data[0].createdAt).toEqual('string')
        expect(typeof res.body.data[0].updatedAt).toEqual('string')

        done();
      });
  });
  it('should return status 404 with data', function(done) {
    const body = {
      order_content: '',
      file_url: '',
      shop_id: ''
    }
    request(app)
      .post(`/user/form`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')

        done();
      });
  });
  it('should return status 401 with data', function(done) {
    const body = {
      order_content: { "data" : "requirement printing options" },
      file_url: 'https://dummy.downloadlink.here',
      shop_id: shopId
    }
    request(app)
      .post(`/user/form`)
      .set('access_token', 'qwerty')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Invalid token found')

        done();
      });
  });
});

describe('PUT /user/upload_receipt', function() {
  it('should return status 200 with data', function(done) {
    const body = {
      proof_receipt_transaction: "https://dummy.link-transaction-proof.com",
      order_Id: orderId
    }
    request(app)
      .put(`/user/upload_receipt`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(Array.isArray(res.body.data)).toEqual(true)
        expect(res.body.msg).toEqual('You have successfully updated your proof receipt transaction')
        expect(res.body.data[0]).toHaveProperty('payment_status')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('order_number')
        expect(res.body.data[0]).toHaveProperty('order_content')
        expect(res.body.data[0]).toHaveProperty('files_url')
        expect(res.body.data[0]).toHaveProperty('order_price')
        expect(res.body.data[0]).toHaveProperty('shop_Id')
        expect(res.body.data[0]).toHaveProperty('email_user')
        expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
        expect(res.body.data[0]).toHaveProperty('createdAt')
        expect(res.body.data[0]).toHaveProperty('updatedAt')
        expect(typeof res.body.data[0].id).toEqual('number')
        expect(typeof res.body.data[0].order_number).toEqual('string')
        expect(typeof res.body.data[0].order_content).toEqual('object')
        expect(typeof res.body.data[0].files_url).toEqual('string')
        expect(typeof res.body.data[0].order_price).toEqual('number')
        expect(typeof res.body.data[0].shop_Id).toEqual('number')
        expect(typeof res.body.data[0].email_user).toEqual('string')
        expect(typeof res.body.data[0].payment_status).toEqual('number')
        expect(typeof res.body.data[0].createdAt).toEqual('string')
        expect(typeof res.body.data[0].updatedAt).toEqual('string')

        done();
      });
  });
  it('should return status 404 with data', function(done) {
    const body = {
      proof_receipt_transaction: "",
      order_Id: ''
    }
    request(app)
      .put(`/user/upload_receipt`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')

        done();
      });
  });
});

describe('GET /user/status_orders', function() {
  it('should return status 200 with data', function(done) {
    request(app)
      .get(`/user/status_orders`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(Array.isArray(res.body.data)).toEqual(true)
        expect(res.body.msg).toEqual('Successfully read all orders that not completed')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('order_number')
        expect(res.body.data[0]).toHaveProperty('order_content')
        expect(res.body.data[0]).toHaveProperty('files_url')
        expect(res.body.data[0]).toHaveProperty('order_price')
        expect(res.body.data[0]).toHaveProperty('shop_Id')
        expect(res.body.data[0]).toHaveProperty('email_user')
        expect(res.body.data[0]).toHaveProperty('payment_status')
        expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
        expect(res.body.data[0]).toHaveProperty('createdAt')
        expect(res.body.data[0]).toHaveProperty('updatedAt')
        expect(typeof res.body.data[0].id).toEqual('number')
        expect(typeof res.body.data[0].order_number).toEqual('string')
        expect(typeof res.body.data[0].order_content).toEqual('object')
        expect(typeof res.body.data[0].files_url).toEqual('string')
        expect(typeof res.body.data[0].order_price).toEqual('number')
        expect(typeof res.body.data[0].shop_Id).toEqual('number')
        expect(typeof res.body.data[0].email_user).toEqual('string')
        expect(typeof res.body.data[0].payment_status).toEqual('number')
        expect(typeof res.body.data[0].createdAt).toEqual('string')
        expect(typeof res.body.data[0].updatedAt).toEqual('string')

        done();
      });
  });
  it('should return status 401 with data', function(done) {
    request(app)
      .get(`/user/status_orders`)
      .set('access_token', 'qwerty')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Invalid token found')

        done();
      });
  });
});

describe('PUT /user/status_orders/:id', function() {
  it('should return status 200 with data', function(done) {
    const body = {
      order_number: "03ea8590-8912-11eb-a47c-477e9a2cdd7b"
    }
    request(app)
      .put(`/user/status_orders/${orderId}`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Successfully cancel your order print status ( number 03ea8590-8912-11eb-a47c-477e9a2cdd7b )')

        done();
      });
  });
});

describe('GET /user/transaction_history', function() {
  it('should return status 200 with data', function(done) {
    request(app)
      .get(`/user/transaction_history`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(Array.isArray(res.body.data)).toEqual(true)
        expect(res.body.msg).toEqual('Successfully read all your transaction history')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('order_number')
        expect(res.body.data[0]).toHaveProperty('order_content')
        expect(res.body.data[0]).toHaveProperty('files_url')
        expect(res.body.data[0]).toHaveProperty('order_price')
        expect(res.body.data[0]).toHaveProperty('shop_Id')
        expect(res.body.data[0]).toHaveProperty('email_user')
        expect(res.body.data[0]).toHaveProperty('payment_status')
        expect(res.body.data[0]).toHaveProperty('proof_receipt_transaction')
        expect(res.body.data[0]).toHaveProperty('createdAt')
        expect(res.body.data[0]).toHaveProperty('updatedAt')
        expect(typeof res.body.data[0].id).toEqual('number')
        expect(typeof res.body.data[0].order_number).toEqual('string')
        expect(typeof res.body.data[0].order_content).toEqual('object')
        expect(typeof res.body.data[0].files_url).toEqual('string')
        expect(typeof res.body.data[0].order_price).toEqual('number')
        expect(typeof res.body.data[0].shop_Id).toEqual('number')
        expect(typeof res.body.data[0].email_user).toEqual('string')
        expect(typeof res.body.data[0].payment_status).toEqual('number')
        expect(typeof res.body.data[0].createdAt).toEqual('string')
        expect(typeof res.body.data[0].updatedAt).toEqual('string')

        done();
      });
  });
});

describe('GET /user/shop_list', function() {
  it('should return status 200 with data', function(done) {
    request(app)
      .get(`/user/shop_list`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(Array.isArray(res.body.data)).toEqual(true)
        expect(res.body.msg).toEqual('Successfully read list of shop including the details near your area')
        expect(res.body.data[0]).toHaveProperty('id')
        expect(res.body.data[0]).toHaveProperty('name')
        expect(res.body.data[0]).toHaveProperty('products')
        expect(res.body.data[0]).toHaveProperty('location')
        expect(res.body.data[0]).toHaveProperty('status_open')
        expect(res.body.data[0]).toHaveProperty('email')
        expect(res.body.data[0]).toHaveProperty('password')
        expect(res.body.data[0]).toHaveProperty('createdAt')
        expect(res.body.data[0]).toHaveProperty('updatedAt')

        done();
      });
  });
});

afterAll((done) => {
  sequelize.close()
  done()
})