import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import User from './user';
import { makeHotAction } from './actions';


class Not extends React.Component {
    render() {
        const { users, dispatch } = this.props;
        if (!users) {
            return null;
        }
        const notUsers = (
            <div className="users">
                {users.map(user => <User user={user} makeHotFunction={id => dispatch(makeHotAction(id))}/>)}
            </div>
        );
        return (
            <div id="not">
                {!users.length && <div>Nobody is not hot!</div>}
                {!!users.length && notUsers}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/hot">See who&apos;s hot</Link>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => user.hot == false)
    };
};

export default connect(mapStateToProps)(Not);
