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
        this.handleFriendRequest = this.handleFriendRequest.bind(this);
        this.rejectFriendRequest = this.rejectFriendRequest.bind(this);

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
    handleFriendRequest() {
        //find out what the status is
        //the status here will will never be pending b/c if the status is pending, this method cannot be called so the status is either Make, Accept, End
        //the server can decide how to update so just send to updateFriendship regardless of status
        console.log('Friend Request Button Clicked');
        // let url = '/api/makeFriend/';
        // let status = { status: this.state.friendshipStatus }

        //if(this.state.friendshipStatus != 'make') {
        let url = '/api/updateFriendship/';
        //}

        axios.post(url + this.state.receiver_id).then((newStatus) => {
            console.log('newStatus:', newStatus);
            this.setState({
                friendshipStatus: newStatus.data.friendshipStatus
            });
        });
    }
    rejectFriendRequest() {
        console.log('Reject Button Clicked');
    }
    render() {
        console.log(this.state);
        return (
            <Button center onClick={this.state.friendshipStatus == 'Pending' ||  this.handleFriendRequest}>{this.state.friendshipStatus} Friend Request</Button>
        );
    }
}
