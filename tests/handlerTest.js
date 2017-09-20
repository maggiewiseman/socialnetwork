
var expect = require('chai').expect;
var assert = require('chai').assert;
var rewire = require('rewire');

var handler = rewire('../handler');

handler.__set__('dbQuery', require('./mocks/mockDbQuery'));

describe('handle searchName', function() {
    it('should return user_id, first_name and last_name for a string that matches the first_name or user_name in the database', function(done) {
        var req = {
            session: {
                user: { id: 1}
            },
            body: { string: 'm'}
        };
        var res = {
            json : function(obj) {
                //I want it to take the parameter and add it to the res object.
                return obj;
            }
        };
        var query = 'searchName';
        handler.handle(query, req, res).then((result) => {
            console.log('in then', result);
            assert.equal(result.results.length, 3, '3 rows returned');
        }).then(done, done);




    });

    it('should return return an empty array if the string does not exist in the database');

});
