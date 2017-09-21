import axios from './axios';

const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP',
    FIND_FRIENDS = 'FIND_FRIENDS',
    GET_ONLINE_USERS = 'GET_ONLINE_USERS',
    UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS',
    ADD_MESSAGE = 'ADD_MESSAGE',
    CHAT_MESSAGES = 'CHAT_MESSAGES',
    SAVE_CURR_USER = 'SAVE_CURR_USER',
    SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS',
    DELETE_SEARCH_RESULTS = 'DELETE_SEARCH_RESULTS',
    SAVE_WALL_POSTS = 'SAVE_WALL_POSTS',
    GET_WALL_POSTS = 'GET_WALL_POSTS';

export function saveWallPosts(posts) {
    return {
        type: SAVE_WALL_POSTS,
        posts
    };
}

export function getWallPosts(posts) {
    return axios.get('/api/wallposts/:id')
    return {
        type: GET_WALL_POSTS,
        posts
    };
}
export function saveSearchResults(results, srchStrng) {
    return {
        type: SAVE_SEARCH_RESULTS,
        searchResults: results,
        sesarchString: srchStrng
    };
}

export function deleteSearchResults() {
    return {
        type: DELETE_SEARCH_RESULTS,
        searchResults: null
    };
}

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
    return {
        type: ADD_MESSAGE,
        message
    };
}

export function getMessages(messages) {

    return {
        type: CHAT_MESSAGES,
        messages
    };
}

export function saveCurrUser(currUser) {
    return {
        type: SAVE_CURR_USER,
        currUser
    };
}
