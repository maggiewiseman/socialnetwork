import axios from 'axios';

const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';

export function receiveFriends() {
    console.log('ACTION: about to send to axios');
    return axios.get('/api/getFriendships').then((results)=> {
        console.log('Back from getting friendships', results);
        return {
            type: RECEIVE_FRIENDS,
            friends: results.data.friends
        };

    }).catch(e => {
        console.log(e);
        return {
            type: 'ERROR'
        };
    });
}
