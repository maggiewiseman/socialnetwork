const mockDb = require('./mockDbQuery');
var expect = require('chai').expect;

describe('test getMatches is connecting to fake database', function(done) {
    it('should return 3 rows when I search for the string m', function(done) {

        mockDb.getMatches(['m%']).then((result) => {
            console.log(result.rows.length);
            expect(result.rows.length).to.equal(3);
        }).then(done, done);
    });

});
