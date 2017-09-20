var rewire = require('rewire');
var dbQuery = rewire('../../dbQuery');
var expect = require('chai').expect;
var assert = require('chai').assert;

const secrets = require('../../secrets.json');

dbQuery.__set__('dbUrl', `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social-test`);

console.log('dbURL', dbQuery.__get__('dbUrl'));

describe('test getMatches is connecting to fake database', function(done) {
    it('should return 3 rows when I search for the string m', function(done) {
        dbQuery.getMatches(['m%']).then((result) => {
            console.log(result.rows.length);
            expect(result.rows.length).to.equal(3);
        }).then(done, done);
    });
});
