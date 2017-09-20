const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP',
    FIND_FRIENDS = 'FIND_FRIENDS',
    GET_ONLINE_USERS = 'GET_ONLINE_USERS',
    UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS',
    ADD_MESSAGE = 'ADD_MESSAGE',
    CHAT_MESSAGES = 'CHAT_MESSAGES',
    SAVE_CURR_USER = 'SAVE_CURR_USER',
    SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS',
    DELETE_SEARCH_RESULTS = 'DELETE_SEARCH_RESULTS';

export default function(state = {}, action) {
    if (action.type == RECEIVE_FRIENDS) {

        state = Object.assign({}, state, {
            friends: action.friends
        });
    }

    if(action.type == UPDATE_FRIENDSHIP) {
        state = Object.assign({}, state, {
            friends: state.friends.map((friend) => {
                if(friend.id == action.id) {
                    return Object.assign({}, friend, {
                        status: action.status
                    });
                } else {
                    return friend;
                }
            })
        });
    }

    if(action.type == FIND_FRIENDS) {
        state = Object.assign({}, state, {
            foundFriends: action.foundFriends
        });
    }


    if(action.type == GET_ONLINE_USERS || action.type == UPDATE_ONLINE_USERS) {
        state = Object.assign({}, state, {
            users: action.users
        });
    }

    if(action.type == ADD_MESSAGE) {
        state = Object.assign({}, state, {
            messages: state.messages ? [ ...state.messages, action.message] : [action.message]
        });

    }

    if(action.type == CHAT_MESSAGES) {
        state = Object.assign({}, state, {
            messages: action.messages
        });
    }

    if(action.type == SAVE_CURR_USER) {
        state = Object.assign({}, state, {
            currUser: action.currUser
        });
    }

    if(action.type == SAVE_SEARCH_RESULTS) {
        state = Object.assign({}, state, {
            searchResults: action.searchResults,
            searchString: action.searchString
        });
    }

    if (action.type == DELETE_SEARCH_RESULTS) {
        state = Object.assign({}, state, {
            searchResults: action.searchResults,
            searchString: ''
        });
    }

    console.log('state in reducer', state);
    return state;

}
