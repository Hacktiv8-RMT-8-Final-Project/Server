const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt');



describe('POST /user/register', function() {
  const body = {
    username: 'Siomay',
    email: 'siomay@mail.com',
    password: '123456'
  }
  it('should return status 201 with data', function(done) {
    request(app)
      .post('/user/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(typeof res.body.id).toEqual('number')
        expect(typeof res.body.email).toEqual('string')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Register success')
        expect(res.body.email).toEqual(body.email)
        done();
      });
  });//
  
  it('should return message Email is invalid', function(done) {
    const body = {
      username: 'Siomay',
      email: 'siom',
      password: '123456'
    }
    request(app)
      .post('/user/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(res.body.msg[0]).toEqual('Email is invalid')

        done();
      });
  });
  it('should return error message', function(done) {
    let body = {
      username: 'Siomay',
      email:'siomay@mail.com',
      password: '1234'
    }
    request(app)
      .post('/user/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(res.body.msg[0]).toEqual('Password must be at least 6 characters')
        
        done();
      });
  });
  it('should return error message', function(done) {
    let body = {
      username: '',
      email:'',
      password: ''
    }
    request(app)
      .post('/user/register')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(400)
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Username can not be empty')
        expect(res.body.msg[1]).toEqual('Email can not be empty')
        expect(res.body.msg[2]).toEqual('Email is invalid')
        expect(res.body.msg[3]).toEqual('Password can not be empty')
        expect(res.body.msg[4]).toEqual('Password must be at least 6 characters')
        
        done();
      });
  });
});

describe('POST /user/login', function() {
  const body = {
    email: 'siomay@mail.com',
    password: '123456'
  }
  const username = 'Siomay'
  it('should return status 200 with access token', function(done) {
    request(app)
      .post('/user/login')
      .send(body)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('msg')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('access_token')
        expect(typeof res.body.username).toEqual('string')
        expect(typeof res.body.msg).toEqual('string')
        expect(typeof res.body.email).toEqual('string')
        expect(typeof res.body.access_token).toEqual('string')
        expect(res.body.email).toEqual(body.email)
        expect(res.body.msg).toEqual('Login success, access token granted')
        expect(res.body.username).toEqual(username)
        done();
      });
  });
  it('should return message Invalid email or password', function(done) {
    const body = {
      email:'siomay@mail.com',
      password: '654321'
    }
    request(app)
      .post('/user/login')
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
      .post('/user/login')
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

afterAll((done) => {
  User
    .destroy({where:{email:'siomay@mail.com'}})
    .then(user => {
      console.log('User has been deleted', 'ini >>>> afterAllTest');
      sequelize.close()
      done()
    })
    .catch(err => {
      console.log(err, '>>>> afterAllTest');
      sequelize.close()
      done()
    })
})