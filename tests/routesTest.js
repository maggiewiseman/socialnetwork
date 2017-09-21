//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const csurf = require('csurf');

const csrfProtection = csrf({ cookie: true });

let should = chai.should();

chai.use(chaiHttp);

describe('registration', () => {
    it('should retuan a status code of 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

//var mockHandler = require('./mocks/mockHandler').handle;

//routes.__set__('handler', mockHandler);

describe('route post /api/search', function() {
    it('ASSERT: should return user_id, first_name and last_name for a string that matches the first_name or user_name in the database', function(done) {
        chai.request(server)
            .post('/api/search')
            .send({string: 's'})
            .then((err, res) => {
                res.body.should.have.property('results');
                res.body.results.length.should.be.eql(3);
                done();
            });
    });
});
