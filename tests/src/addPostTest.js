var expect = chai.expect;

describe('addPost logic', function() {

    let friendList = [{
        first_name: "Phil",
        last_name: "Bulldog",
        id: 4,
        profile_pic: "https://s3.amazonaws.com/maggiesgingersocialnetwork/CKDMOXVoOUr19_plrT598KsKjiu4Zjax.png",
        bio: "Age 40. Planned family vacation to Niagara falls. Wife expected more. Kids are bored. Considering jumping in.",
        status: 2
    }, {
        first_name: "Tramp",
        last_name: "Darling",
        id: 10,
        profile_pic: "https://s3.amazonaws.com/maggiesgingersocialnetwork/qyeetFGN9G910sFPEQfA9O-EDJL6Mndw.png",
        bio: null,
        status: 1
    }];

    it('should return true if the user is friends with the dog in the otherProfile', function() {

        expect(checkFriendship(4, friendList)).to.equal(true);

    });

    it('should return false if the user is not in the friend list at all', function() {
        expect(checkFriendship(5, friendList)).to.equal(false);
    });

    it('should return false if the user is in the list but the status is not 2', function() {
        expect(checkFriendship(10, friendList)).to.equal(false);
    });
});
