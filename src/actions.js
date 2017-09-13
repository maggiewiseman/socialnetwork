import axios from 'axios';

export function receiveFriends() {
    console.log('ACTION: about to send to axios');
    axios.get('/api/getFriendships').then((results)=> {
        console.log('ACTIONS: receiveFriends: ', results);

        if(results.data.success == 200) {
            return {
                type: 'RECIEVE_FRIENDS',
                friends: results.data.friends
            };
        } else {
            return {
                type: 'RECEIVE_FRIENDS',
                friends: null
            };
        }
    }).catch(e => {
        console.log(e);
        this.setState({
            error: e
        });
    });
}
