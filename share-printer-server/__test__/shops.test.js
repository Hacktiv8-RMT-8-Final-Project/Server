const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { generateToken } = require('../helpers/jwt');
const { Shop } = require('../models')

let shopId = 55
describe('POST /shop/register', function() {
  const body = {
    email: 'test@mail.com',
    password: '123456',
    name: 'toko printer',
    location: 'jakarta',
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
    const body = {
      email: '',
      password: '',
      name: '',
      location: '',
    }
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
    email: 'test@mail.com',
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
      email: 'test@mail.com',
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

describe('GET /shop/detail', function() {
  it('should return status 200 with data', function(done) {
    const access_token = generateToken({
      id: shopId,
      email: 'printer@mail.com'
    })
    request(app)
      .get('/shop/detail')
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(typeof res.body.data).toEqual('object')
        expect(res.body.msg).toEqual('Successfully read shop details')
        expect(res.body.data).toHaveProperty('id')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('products')
        expect(res.body.data).toHaveProperty('location')
        expect(res.body.data).toHaveProperty('status_open')
        expect(res.body.data).toHaveProperty('email')
        expect(res.body.data).toHaveProperty('createdAt')
        expect(res.body.data).toHaveProperty('updatedAt')
        expect(typeof res.body.data.id).toEqual('number')
        expect(typeof res.body.data.name).toEqual('string')
        expect(typeof res.body.data.location).toEqual('string')
        expect(typeof res.body.data.status_open).toEqual('boolean')
        expect(typeof res.body.data.email).toEqual('string')
        expect(typeof res.body.data.password).toEqual('string')
        expect(typeof res.body.data.createdAt).toEqual('string')
        expect(typeof res.body.data.updatedAt).toEqual('string')
        expect(res.body.data.name).toEqual('toko printer')
        expect(res.body.data.location).toEqual('jakarta')
        expect(res.body.data.status_open).toEqual(true)
        expect(res.body.data.email).toEqual('test@mail.com')

        done();
      });
  });
  it('should return error message', function(done) {
    let access_token = generateToken({
      id: 0,
      email: 'qwerty'
    })
    request(app)
      .get('/shop/detail')
      .set('access_token', access_token)
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

describe('PUT /shop/detail/:id', function() {
  it('should return status 200 with data', function(done) {
    const access_token = generateToken({
      id: shopId,
      email: 'printer@mail.com'
    })
    const body = {
      name: 'toko printer',
      location: 'jakarta',
      status_open: true
    }
    request(app)
      .put(`/shop/detail/${shopId}`)
      .set('access_token', access_token)
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('data')
        expect(typeof res.body.msg).toEqual('string')
        expect(typeof res.body.data).toEqual('object')
        expect(res.body.msg).toEqual('successfully updated data')
        expect(res.body.data).toHaveProperty('id')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('products')
        expect(res.body.data).toHaveProperty('location')
        expect(res.body.data).toHaveProperty('status_open')
        expect(res.body.data).toHaveProperty('email')
        expect(res.body.data).toHaveProperty('createdAt')
        expect(res.body.data).toHaveProperty('updatedAt')
        expect(typeof res.body.data.id).toEqual('number')
        expect(typeof res.body.data.name).toEqual('string')
        expect(typeof res.body.data.location).toEqual('string')
        expect(typeof res.body.data.status_open).toEqual('boolean')
        expect(typeof res.body.data.email).toEqual('string')
        expect(typeof res.body.data.password).toEqual('string')
        expect(typeof res.body.data.createdAt).toEqual('string')
        expect(typeof res.body.data.updatedAt).toEqual('string')
        expect(res.body.data.name).toEqual('toko printer')
        expect(res.body.data.location).toEqual('jakarta')
        expect(res.body.data.status_open).toEqual(true)
        expect(res.body.data.email).toEqual('test@mail.com')

        done();
      });
  });
});

afterAll((done) => {
  Shop
    .destroy({where:{email:'test@mail.com'}})
    .then(shop => {
      console.log('Shop has been deleted', 'ini >>>> afterAllTest');
      sequelize.close()
      done()
    })
    .catch(err => {
      console.log(err, '>>>> afterAllTest');
      sequelize.close()
      done()
    })
})