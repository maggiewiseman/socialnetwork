import React from 'react';
import { connect } from 'react-redux';
import makeFriendList from './makeFriendList';



const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

class FriendList extends React.Component {
    render() {
        const { friends, handleFriendshipChange } = this.props;
        if (!friends) {
            return null;
        }
        return makeFriendList(friends, handleFriendshipChange);
    }
}

const mapStateToProps = function(state) {
    console.log('mapping state to props in friendList');
    return {
        friends: state.friends && state.friends.filter(friend => {
            if(friend.status == ACCEPTED) {
                console.log('maping...' + friend.first_name);
                return friend;
            }
        })
    };
};

export default connect(mapStateToProps)(FriendList);
