import React from 'react';
import { connect } from 'react-redux';
import makeFriendList from './makeFriendList';


const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

class FriendRequestList extends React.Component {
    render() {
        const { friends, handleFriendshipChange} = this.props;
        
        if (!friends) {
            return null;
        }
        return makeFriendList(friends, handleFriendshipChange);
    }
}

const mapStateToProps = function(state) {
    console.log('Friend Request List maping state to props');
    return {
        friends: state.friends && state.friends.filter(friend => {
            if(friend.status == PENDING) {
                return friend;
            }
        })
    };
};

export default connect(mapStateToProps)(FriendRequestList);
