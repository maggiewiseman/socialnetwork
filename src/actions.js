import axios from './axios';

const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP',
    FIND_FRIENDS = 'FIND_FRIENDS';

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
    console.log('url is: ' + '/api/updateFriendship/' + id);
    return axios.post('/api/updateFriendship/' + id).then((results) => {
        console.log('ACTION: UPDATE_FRIENDSHIP', results);
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

export function findAFriend(name, url) {
    console.log('findAfriend', name, url);
    return axios.post(url, {name}).then(foundFriends => {
        console.log(foundFriends);
        return {
            type: FIND_FRIENDS,
            foundFriends: foundFriends.data.friends
        };

    }).catch(e => {
        console.log(e);
        return {
            type: 'ERROR'
        };
    });
}
