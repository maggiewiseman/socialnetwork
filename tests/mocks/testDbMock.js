const mockDb = require('./mockDbQuery');
var expect = require('chai').expect;

describe('test getMatches is connecting to fake database', function(done) {
    it('should return 2 rows when I search for the string m', function(done) {

        mockDb.getMatches(['m%']).then((result) => {
            expect(result.rows.length).to.equal(2);
        }).then(done, done);
    });
});

describe('getFriends test and  should return a list of friends (status pending or accepted) for a given user whether that user is the sender or the receiver', function() {
    it('should return 2 rows when the user id is 1 because user 1 has 1 pending friendship for which he is the receiver and 1 accepted friendship', function(done) {
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


describe('getUsersByIds', function() {
    it('should return an array of users equal to the number of unique ids in the array and each object in the array should contain id, first_name, last_name, profile_pic, bio', function(done) {
        mockDb.getUsersByIds([1,2,1]).then(result => {
            expect(result.rows.length).to.equal(2);
            expect(result).to.nested.include({'rows[1].first_name': 'Lizzy'});
            expect(result.rows[0]).to.have.property('id');
            expect(result.rows[0]).to.have.property('last_name');
            expect(result.rows[0]).to.have.property('profile_pic');
            expect(result.rows[0]).to.have.property('bio');
        }).then(done, done);
    });
});
