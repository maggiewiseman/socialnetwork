var rewire = require('rewire');
var myDbQuery = rewire('../../dbQuery');
var spicedPg = require('spiced-pg');

var expect = require('chai').expect;
var assert = require('chai').assert;

const secrets = require('../../secrets.json');
var url = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social-test`;
myDbQuery.__set__('db', spicedPg(url) );

module.exports = myDbQuery;

// describe('test getMatches is connecting to fake database', function(done) {
//     it('should return 3 rows when I search for the string m', function(done) {
//
//         myDbQuery.getMatches(['m%']).then((result) => {
//             console.log(result.rows.length);
//             expect(result.rows.length).to.equal(3);
//         }).then(done, done);
//     });
//
// });
