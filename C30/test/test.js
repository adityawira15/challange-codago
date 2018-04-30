const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHTTP)

describe('index', function(){
    it('Should return data and token', (done)=>{
        chai.request(server)
        .post('/api/users/register')
        .send({
            email: 'agungputra@gmail.com',
            password: '123456'
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');            
            res.body.should.have.property('data');
            res.body.data.should.have.property('email');
            res.body.should.have.property('token');
            done()
        })
    })
var token = '';
    it('Should return data and token 2', (done) => {
        chai.request(server)
        .post('/api/users/login')
        .send({
            email: 'adityawira@gmail.com',
            password: '123456'
        })
        .end((err, res) => {
            token = res.body.token;            
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('email');
            res.body.should.have.property('token');
            
            done()
        })
    })

    it('Should return valid = true', (done) => {
        chai.request(server)
        .post('/api/users/check')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('valid');
            res.body.valid.should.be.an('boolean');
            res.body.valid.should.equal(true);
            done()
        })
    })

    it('Destroy', (done) => {
        chai.request(server)
        .get('/api/users/destroy')
        .send({token: token})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('logout');
            res.body.logout.should.be.an('boolean');
            res.body.logout.should.equal(true)
            done()
        })
    })
})