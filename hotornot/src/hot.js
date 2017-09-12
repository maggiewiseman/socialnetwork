import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import User from './user';
import { makeNotAction } from './actions';


class Hot extends React.Component {
    render() {
        const { users, dispatch} = this.props;
        if (!users) {
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
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/not">See who&apos;s not</Link>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => {
            if(user.hot) {
                return user;
            }
        })
    };
};

export default connect(mapStateToProps)(Hot);
