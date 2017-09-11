import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';

import { Button } from './styledComponents/buttons';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            receiver_id: props.receiver
        };

    }
    componentWillMount() {
        //getFriendStatus
        console.log('FriendButton: getting status');
        axios.get('/api/friendStatus/' + this.state.receiver_id ).then((results) => {
            console.log('status:', results);
            this.setState({
                friendshipStatus: results.data.friendshipStatus
            });
        }).catch(e => {
            this.setState({
                error: e
            });
        });
    }
    render() {
        console.log(this.state);
        return (
            <Button center>{this.state.friendshipStatus} Friend Request</Button>
        );
    }
}
