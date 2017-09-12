import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { receiveUsers } from './actions';
import { makeHotAction, makeNotAction } from './actions';
import User from './user';

class HotOrNot extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveUsers());
    }
    render() {
        const { users, dispatch } = this.props;
        if (!users) {
            console.log('no users');
            return null;
        } else {
            console.log(users);
        }
        return (
            <div id="hot-or-not">
                {users[0] && <User user={users[0]}
                    makeHotFunction={id => dispatch(makeHotAction(id))}
                    makeNotFunction={id => dispatch(makeNotAction(id))} />}
                {!users[0] && <div>Everybody is already hot or not!</div>}
                <nav>
                    <Link to="/hot">See who&apos;s hot</Link>
                    <Link to="/not">See who&apos;s not</Link>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => user.hot == null)
    }
}

export default connect(mapStateToProps)(HotOrNot);
