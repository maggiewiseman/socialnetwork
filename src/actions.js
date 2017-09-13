import axios from 'axios';

const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP';

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

export function updateFriendship(id) {
    console.log('ACTION: about to updateFriendship');
    return axios.post('/api/updateFriendship/' + id).then((results) => {
        return {
            type: UPDATE_FRIENDSHIP,
            status: results.data.status,
            id
        };
    }).catch(e => {
        console.log(e);
        return {
            type: 'ERROR'
        };
    });
}
