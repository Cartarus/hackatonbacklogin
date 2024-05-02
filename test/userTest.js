const assert = require('chai').assert;
const { describe, it } = require('mocha');
const usercontroller = require('../controllers/userControllers');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

const login = usercontroller.LoginUser;
const register = usercontroller.regisertUser;


chai.use(chaiHttp);
const url= 'http://localhost:3001';


describe('Login group', function() {

    it('Login success', function(done) {
        chai
            .request(url)
            .post('/users/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'administrador@gse.com.co', password: 'wR2%i'})
            .end(function(error, response, body) {
                expect(response).to.have.status(200);
                done();
            });
    });
    it('Login failed: User not registered', function (done) {
        chai
            .request(url)
            .post('/users/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'josue.pajaro@gse.com.co', password: 'wR2%i'})
            .end(function(error, response, body) {
                expect(response).to.have.status(500);
                done();
            });
    })
    it('Login failed: Password invalid', function (done) {
        chai
            .request(url)
            .post('/users/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'administrador@gse.com.co', password: 'a%i'})
            .end(function(error, response, body) {
                expect(response).to.have.status(500, "Nombre de usuario no encontrado.")
                ;
                done();
            });
    })
});


describe('Register tests', function() {

    it('Register success', function(done) {
        chai
            .request(url)
            .post('/users/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'admin@gse.com.co', password: 'wR2%i'})
            .end(function(error, response, body) {
                expect(response).to.have.status(201);
                done();
            });
    });
    it('Register failed: duplicate user', function (done) {
        chai
            .request(url)
            .post('/users/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'administrador@gse.com.co', password: 'wR2%i'})
            .end(function(error, response, body) {
                expect(body).to.have.status(500 )
                done();
            });
    })
  
});