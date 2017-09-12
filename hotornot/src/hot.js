import React from 'react';
import { Link } from 'react-router';
import User from './user';

class Hot extends React.Component {
    render() {
        const { users, makeNot } = this.props;
        if (!users) {
            return null;
        }
        const hotUsers = (
            <div className="users">
                {users.map(user => <User user={user} makeNot={makeNot} />)}
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
