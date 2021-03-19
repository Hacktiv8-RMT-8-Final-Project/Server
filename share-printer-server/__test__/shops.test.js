const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { createAccessToken } = require('../helpers/jwt');

afterAll((done) => {
  sequelize.close()
  done()
})

// let access_token
// beforeAll((done) => {
//   access_token = createAccessToken({
//     id: 1,
//     email: 'user@mail.com'
//   })
//   done()
// })

describe('POST /shop/register', function() {
  const body = {
    email: 'printer@mail.com',
    password: '123456',
    name: 'toko printer',
    location: 'jakarta',
    products: []
  }
  it('should return status 201 with data', function(done) {
    request(app)
      .post('/shop/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('name')
        expect(typeof res.body.id).toEqual('number')
        expect(typeof res.body.email).toEqual('string')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Register success')
        expect(res.body.email).toEqual(body.email)
        expect(res.body.name).toEqual(body.name)
        done();
      });
  });
  it('should return status 400 with error message', function(done) {
    request(app)
      .post('/shop/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Name can not be empty')
        expect(res.body.msg[1]).toEqual('Location can not be empty')
        expect(res.body.msg[2]).toEqual('Email can not be empty')
        expect(res.body.msg[3]).toEqual('Password can not be empty')
        done();
      });
  });
});

describe('POST /shop/login', function() {
  const body = {
    email: 'budi@mail.com',
    password: '123456'
  }
  it('should return status 200 with access token', function(done) {
    request(app)
      .post('/shop/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('access_token')
        expect(typeof res.body.msg).toEqual('string')
        expect(typeof res.body.email).toEqual('string')
        expect(typeof res.body.access_token).toEqual('string')
        expect(res.body.email).toEqual(body.email)
        expect(res.body.msg).toEqual('Login success, access token granted')
        done();
      });
  });
  it('should return message Invalid email or password', function(done) {
    const body = {
      email: 'budi@mail.com',
      password: '6453'
    }
    request(app)
      .post('/shop/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Invalid email or password')

        done();
      });
  });
  it('should return message Invalid email or password', function(done) {
    let body = {
      email:'wrong@mail.com',
      password: '123456'
    }
    request(app)
      .post('/shop/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Invalid email or password')
        
        done();
      });
  });
});




// describe('GET /shops', function() {
//   it('should return status 200 with download link', function(done) {
//     request(app)
//       .get('/shops')
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('downloadLink')
//         expect(typeof res.body.downloadLink).toEqual('string')
//         expect(res.body.downloadLink).toEqual(body.email)
        
//         done();
//       });
//   });
//   it('should return error message', function(done) {
//     let access_token = createAccessToken({
//       id: 0,
//       email: ''
//     })
//     request(app)
//       .get('/shops')
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(400)
//         expect(Array.isArray(res.body)).toEqual(true)
//         expect(res.body.length).not.toEqual(0)
        
//         done();
//       });
//   });
// });

// describe('GET /shops', function() {
//   it('should return status 200 with transaction history', function(done) {
//     request(app)
//       .get('/shops')
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(Array.isArray(res.body)).toEqual(true)
//         expect(res.body[0]).toHaveProperty('order_number')
//         expect(res.body[0]).toHaveProperty('files_url')
//         expect(res.body[0]).toHaveProperty('shop_id')
//         expect(res.body[0]).toHaveProperty('email_user')
//         expect(res.body[0]).toHaveProperty('buy_price')
//         expect(res.body[0]).toHaveProperty('payment_status')
//         expect(res.body[0]).toHaveProperty('created_at')
//         expect(res.body[0]).toHaveProperty('updated_at')
//         expect(res.body[0]).toHaveProperty('prove_of_transaction')
//         expect(res.body[0]).toHaveProperty('order_content')
//         expect(typeof res.body.order_number).toEqual('string')
//         expect(typeof res.body.files_url).toEqual('string')
//         expect(typeof res.body.shop_id).toEqual('integer')
//         expect(typeof res.body.email_user).toEqual('string')
//         expect(typeof res.body.buy_price).toEqual('integer')
//         expect(typeof res.body.payment_status).toEqual('integer')
//         expect(typeof res.body.created_at).toEqual('string')
//         expect(typeof res.body.updated_at).toEqual('string')
//         expect(typeof res.body.prove_of_transaction).toEqual('string')
//         expect(typeof res.body.order_content).toEqual('object')

//         expect(res.body.order_number).toEqual()
//         expect(res.body.files_url).toEqual()
//         expect(res.body.shop_id).toEqual()
//         expect(res.body.email_user).toEqual()
//         expect(res.body.buy_price).toEqual()
//         expect(res.body.created_at).toEqual()
//         expect(res.body.updated_at).toEqual()
//         expect(res.body.prove_of_transaction).toEqual()
//         expect(res.body.order_content).toEqual()
        
//         done();
//       });
//   });
// });

// describe('GET /shops', function() {
//   it('should return status 200 and proof of payment', function(done) {
//     request(app)
//       .get('/shops')
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if (err) return done(err);
//         expect(res.status).toEqual(200)
//         expect(Array.isArray(res.body)).toEqual(true)
//         expect(res.body[0]).toHaveProperty('order_number')
//         expect(res.body[0]).toHaveProperty('files_url')
//         expect(res.body[0]).toHaveProperty('shop_id')
//         expect(res.body[0]).toHaveProperty('email_user')
//         expect(res.body[0]).toHaveProperty('buy_price')
//         expect(res.body[0]).toHaveProperty('payment_status')
//         expect(res.body[0]).toHaveProperty('created_at')
//         expect(res.body[0]).toHaveProperty('updated_at')
//         expect(res.body[0]).toHaveProperty('prove_of_transaction')
//         expect(res.body[0]).toHaveProperty('order_content')
//         expect(typeof res.body.order_number).toEqual('string')
//         expect(typeof res.body.files_url).toEqual('string')
//         expect(typeof res.body.shop_id).toEqual('integer')
//         expect(typeof res.body.email_user).toEqual('string')
//         expect(typeof res.body.buy_price).toEqual('integer')
//         expect(typeof res.body.payment_status).toEqual('integer')
//         expect(typeof res.body.created_at).toEqual('string')
//         expect(typeof res.body.updated_at).toEqual('string')
//         expect(typeof res.body.prove_of_transaction).toEqual('string')
//         expect(typeof res.body.order_content).toEqual('object')

//         expect(res.body.order_number).toEqual()
//         expect(res.body.files_url).toEqual()
//         expect(res.body.shop_id).toEqual()
//         expect(res.body.email_user).toEqual()
//         expect(res.body.buy_price).toEqual()
//         expect(res.body.created_at).toEqual()
//         expect(res.body.updated_at).toEqual()
//         expect(res.body.prove_of_transaction).toEqual()
//         expect(res.body.order_content).toEqual()
        
//         done();
//       });
//   });
// });