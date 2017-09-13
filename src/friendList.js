import React from 'react';

import { connect } from 'react-redux';
import User from './user';
import { makeNotAction } from './actions';

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

class FriendList extends React.Component {
    render() {
        const { friends, dispatch} = this.props;
        if (!friends) {
            return null;
        }
        const hotUsers = (
            <div className="users">
                {users.map(user => <User user={user}
                    makeNotFunction={id => dispatch(makeNotAction(id))} />)}
            </div>
        );
        return (
            <div id="hot">
                {!users.length && <div>Nobody is hot!</div>}
                {!!users.length && hotUsers}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        friends: state.friends && state.users.filter(friend => {
            if(friend.status == ACCEPTED) {
                return friend;
            }
        })
    };
};

export default connect(mapStateToProps)(FriendList);
