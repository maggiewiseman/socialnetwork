var expect = require('chai').expect;
var assert = require('chai').assert;
var rewire = require('rewire');

var handler = rewire('../handler');
handler.__set__('dbQuery', require('./mocks/mockDbQuery'));

var res = {
    json : function(obj) {
        return obj;
    }
};

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;


describe('handle searchName', function() {
    it('ASSERT: should return user_id, first_name and last_name for a string that matches the first_name or user_name in the database', function(done) {

        let req = {
            session: {
                user: { id: 1}
            },
            body: { string: 'm'}
        };

        var res = {
            json : function(obj) {
                return obj;
            }
        };

        let query = 'searchName';

        handler.handle(query, req, res).then((result) => {

            assert.equal(result.results.length, 2, '2 rows returned');

        }).then(done, done);

    });

    it('EXPECT: should return id, first_name and last_name for a string that matches the first_name or user_name in the database', function(done) {
        let req = {
            session: {
                user: { id: 1}
            },
            body: { string: 'm'}
        };

        let query = 'searchName';
        handler.handle(query, req, res).then((result) => {
            expect(result.results).to.be.an('array').that.has.length(2);
            expect(result.results[0]).to.have.property('first_name');
            expect(result.results[0]).to.have.property('last_name');
            expect(result.results[0]).to.have.property('id');


        }).then(done, done);
    });

});

describe('handle getfriendships test', function() {
    it('should provide an array that lists id, first_name, last_name, profile_pic, and bio', function(done) {
        let req = {
            session: {
                user: { id: 1}
            }
        };

        let res = {
            json : function(obj) {
                return obj;
            }
        };

        let query = 'getFriendships';
        handler.handle(query, req, res).then((result) => {
            console.log(result);
            expect(result.friends).to.be.an('array').that.has.length(2);
            expect(result.friends[0]).to.have.property('first_name');
            expect(result.friends[0]).to.have.property('last_name');
            expect(result.friends[0]).to.have.property('id');
        }).then(done, done);
    });
});

describe('handle updateFriendship', function() {
    it('should create a new friendship if one does not already exist.', function(done) {
        let req = {
            session: {
                user: { id: 1}
            },
            params: { id: 4}
        };
        let query='updateFriendship';
        handler.handle(query, req, res).then((result) => {
            console.log(result);
            expect(result.friendshipStatus).to.equal('Pending');
        }).then(done, done);
    });

    it('should change friendship status to cancelled and return "Make" if req.session.user.id is equal to the sender_id and if status was pending (1)', function(done) {
        let req = {
            session: {
                user: { id: 1}
            },
            params: { id: 4},
            body: {}
        };
        let query='updateFriendship';
        handler.handle(query, req, res).then((result) => {
            console.log('updateFriendship2ndTest:', result);
            expect(result.friendshipStatus).to.equal('Make');
        }).then(done, done);
    });

    it('should change friendshipStatus to accepted and return "End" if req.session.user.id is eqal to the receiver_id if if status was pending(1)', function(done) {
        let req = {
            session: {
                user: { id: 1}
            },
            params: { id: 3},
            body: {}
        };
        let query='updateFriendship';
        handler.handle(query, req, res).then((result) => {
            console.log('updateFriendship2ndTest:', result);
            expect(result.friendshipStatus).to.equal('End');
        }).then(done, done);
    })
});
