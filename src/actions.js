import axios from 'axios';

export function receiveFriends() {
    console.log('ACTION: about to send to axios');
    return axios.get('/api/getFriendships').then((results)=> {
        return {
            type: 'RECIEVE_FRIENDS',
            friends: results.data.friends
        };

    }).catch(e => {
        console.log(e);
        return {
            type: 'ERROR'
        };
    });
}
