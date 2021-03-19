const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')

let userIdTest = 0
const body = {
  email:'user@mail.com',
  password: '123456'
}

afterAll((done) => {
  sequelize.close()
  done()
})

describe('POST /login', function() {
  it('should return status 200 with access token', function(done) {
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(typeof res.body.access_token).toEqual('string')
        expect(typeof res.body.id).toEqual('number')
        userIdTest = res.body.id
        expect(res.body.email).toEqual(body.email)
        expect(res.body.password).toEqual(body.password)
        done();
      });
  });
  it('should return message Invalid email or password', function(done) {
    const body = {
      email:'user@mail.com',
      password: '654321'
    }
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(401)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toEqual('Invalid email or password')

        done();
      });
  });
  it('should return message Invalid email or password', function(done) {
    let body = {
      email:'wrong@mail.com',
      password: '1234'
    }
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(401)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toEqual('Invalid email or password')
        
        done();
      });
  });
});

describe('POST /register', function() {
  it('should return status 201 with data', function(done) {
    request(app)
      .post('/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(typeof res.body.id).toEqual('number')
        userIdTest = res.body.id
        expect(typeof res.body.email).toEqual('string')
        expect(res.body.msg).toEqual('Register success')
        expect(res.body.email).toEqual(body.email)
        expect(res.body.password).toEqual(body.password)
        done();
      });
  });
  
  it('should return message Invalid email format', function(done) {
    let body = {
      email:'usermail',
      password: '123456'
    }
    request(app)
      .post('/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0].message).toEqual('Invalid email format')

        done();
      });
  });
  it('should return error message', function(done) {
    let body = {
      email:'customer@mail.com',
      password: '1234'
    }
    request(app)
      .post('/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0].message).toEqual('Password must be at least 6 characters')
        
        done();
      });
  });
});