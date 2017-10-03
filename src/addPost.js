/*
so I need to figure out if a post button should appear or not. So when a user goes to a user profile, there should be a friends status.
    if friend status is accepted / if "word"   "End", then the add post section can appear.

    When I go to otherProfile it should request the friendship status which it already does
*/


function checkFriendship(id, friendList) {
    var thisDogIsAPotentialFriend = friendList.find(function(friend) {
        return friend.id == id;
    });

    if(thisDogIsAPotentialFriend) {
        if(thisDogIsAPotentialFriend.status == 2) {
            return true;
        }
    }
    return false;
}
