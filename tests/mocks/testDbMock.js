const mockDb = require('./mockDbQuery');
var expect = require('chai').expect;

describe('test getMatches is connecting to fake database', function(done) {
    it('should return 2 rows when I search for the string m', function(done) {

        mockDb.getMatches(['m%']).then((result) => {
            console.log(result.rows.length);
            expect(result.rows.length).to.equal(2);
        }).then(done, done);
    });

});

describe('getFriends test and  should return a list of friends (status pending or accepted) for a given user whether that user is the sender or the receiver', function() {
    it('should return 2 rows when the user id is 1  ', function(done) {
        mockDb.getFriends([1]).then(result => {
            expect(result).to.be.an('array').that.has.length(2);
            expect(result[1]).to.deep.equal({
                first_name: 'Charley',
                last_name: 'Wiseman',
                id: 3,
                profile_pic: 'my dad',
                bio: 'insurance investigator with the action packed expense account',
                status: 1
            });

        }).then(done, done);


    });

    it('should return 0 rows when the user id is 3 b/c the person with id 3 has 1 pending friendship for which he is the sender, one terminated friendship, and one cancelled friendship.', function(done) {
        mockDb.getFriends([3]).then(result => {
            expect(result.length).to.equal(0);
        }).then(done, done);
    });
});
