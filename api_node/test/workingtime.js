let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

const { WorkingTime } = require('../database/models');

chai.use(chaiHttp);

function first() {

  describe('Login', () => {

    describe('/POST Login', () => {
      it('it should connect user', (done) => {
        chai
          .request(server)
          .post('/api/login')
          .send({
            user: {
              username: 'Rompiot',
              password: 'azerty',
            },
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.have.cookie('csrf_token').not.equal('');
            res.should.have.cookie('jwt_token').not.equal('');
            done();
          });
      });
    });
  });
}

function second() {
  //Our parent block
  describe('Logout', () => {
    describe('/POST Logout', () => {
      it('it should connect user', (done) => {
        chai
          .request(server)
          .post('/api/logout')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.not.have.cookie('csrf_token');
            res.should.not.have.cookie('jwt_token');
            done();
          });
      });

      // it('it should GET all the workingtimes', (done) => {
      //   chai
      //     .request(server)
      //     .get('/api/workingtimes/1')
      //     .end((err, res) => {
      //       // console.log(res);
      //       // console.log(err);
      //       res.should.have.status(200);
      //       res.body.should.be.a('array');
      //       // res.body.length.should.be.eql(0);
      //       done();
      //     });
      // });
    });
  });
}

module.exports = {
  first, second
};

first();
second();