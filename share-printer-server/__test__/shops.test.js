const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { createAccessToken } = require('../helpers/jwt');

afterAll((done) => {
  sequelize.close()
  done()
})

let access_token
beforeAll((done) => {
  access_token = createAccessToken({
    id: 1,
    email: 'user@mail.com'
  })
  done()
})

describe('GET /shops', function() {
  it('should return status 200 with download link', function(done) {
    request(app)
      .get('/shops')
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('downloadLink')
        expect(typeof res.body.downloadLink).toEqual('string')
        expect(res.body.downloadLink).toEqual(body.email)
        
        done();
      });
  });
  it('should return error message', function(done) {
    let access_token = createAccessToken({
      id: 0,
      email: ''
    })
    request(app)
      .get('/shops')
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body.length).not.toEqual(0)
        
        done();
      });
  });
});

describe('GET /shops', function() {
  it('should return status 200 with transaction history', function(done) {
    request(app)
      .get('/shops')
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('order_number')
        expect(res.body[0]).toHaveProperty('files_url')
        expect(res.body[0]).toHaveProperty('shop_id')
        expect(res.body[0]).toHaveProperty('email_user')
        expect(res.body[0]).toHaveProperty('buy_price')
        expect(res.body[0]).toHaveProperty('payment_status')
        expect(res.body[0]).toHaveProperty('created_at')
        expect(res.body[0]).toHaveProperty('updated_at')
        expect(res.body[0]).toHaveProperty('prove_of_transaction')
        expect(res.body[0]).toHaveProperty('order_content')
        expect(typeof res.body.order_number).toEqual('string')
        expect(typeof res.body.files_url).toEqual('string')
        expect(typeof res.body.shop_id).toEqual('integer')
        expect(typeof res.body.email_user).toEqual('string')
        expect(typeof res.body.buy_price).toEqual('integer')
        expect(typeof res.body.payment_status).toEqual('integer')
        expect(typeof res.body.created_at).toEqual('string')
        expect(typeof res.body.updated_at).toEqual('string')
        expect(typeof res.body.prove_of_transaction).toEqual('string')
        expect(typeof res.body.order_content).toEqual('object')

        expect(res.body.order_number).toEqual()
        expect(res.body.files_url).toEqual()
        expect(res.body.shop_id).toEqual()
        expect(res.body.email_user).toEqual()
        expect(res.body.buy_price).toEqual()
        expect(res.body.created_at).toEqual()
        expect(res.body.updated_at).toEqual()
        expect(res.body.prove_of_transaction).toEqual()
        expect(res.body.order_content).toEqual()
        
        done();
      });
  });
});

describe('GET /shops', function() {
  it('should return status 200 and proof of payment', function(done) {
    request(app)
      .get('/shops')
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('order_number')
        expect(res.body[0]).toHaveProperty('files_url')
        expect(res.body[0]).toHaveProperty('shop_id')
        expect(res.body[0]).toHaveProperty('email_user')
        expect(res.body[0]).toHaveProperty('buy_price')
        expect(res.body[0]).toHaveProperty('payment_status')
        expect(res.body[0]).toHaveProperty('created_at')
        expect(res.body[0]).toHaveProperty('updated_at')
        expect(res.body[0]).toHaveProperty('prove_of_transaction')
        expect(res.body[0]).toHaveProperty('order_content')
        expect(typeof res.body.order_number).toEqual('string')
        expect(typeof res.body.files_url).toEqual('string')
        expect(typeof res.body.shop_id).toEqual('integer')
        expect(typeof res.body.email_user).toEqual('string')
        expect(typeof res.body.buy_price).toEqual('integer')
        expect(typeof res.body.payment_status).toEqual('integer')
        expect(typeof res.body.created_at).toEqual('string')
        expect(typeof res.body.updated_at).toEqual('string')
        expect(typeof res.body.prove_of_transaction).toEqual('string')
        expect(typeof res.body.order_content).toEqual('object')

        expect(res.body.order_number).toEqual()
        expect(res.body.files_url).toEqual()
        expect(res.body.shop_id).toEqual()
        expect(res.body.email_user).toEqual()
        expect(res.body.buy_price).toEqual()
        expect(res.body.created_at).toEqual()
        expect(res.body.updated_at).toEqual()
        expect(res.body.prove_of_transaction).toEqual()
        expect(res.body.order_content).toEqual()
        
        done();
      });
  });
});