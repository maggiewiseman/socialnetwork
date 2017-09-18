import axios from './axios';

const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP',
    FIND_FRIENDS = 'FIND_FRIENDS',
    GET_ONLINE_USERS = 'GET_ONLINE_USERS',
    UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS',
    ADD_MESSAGE = 'ADD_MESSAGE';

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

export function getOnlineUsers(id) {
    console.log('ACTIONS: getOnlineUsers');
    return axios.post('/connected/' + id).then((users) => {
        console.log('ACTIONS: back from getting online users, users:', users.data.users);
        return {
            type: GET_ONLINE_USERS,
            users: users.data.users
        };
    }).catch(e => {
        console.log(e);
        return {
            type: 'ERROR'
        };
    });
}

export function updateOnlineUsers(users) {
    return {
        type: UPDATE_ONLINE_USERS,
        users
    };

}

export function addMessage(message) {
    return axios.post('/api/message', {message}).then((messages) => {
        console.log('ACTIONS: back from adding message');
        return {
            type: ADD_MESSAGE,
            messages: messages.data.messages
        };
    });
}
