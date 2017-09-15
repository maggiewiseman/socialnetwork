const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS',
    UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP',
    FIND_FRIENDS = 'FIND_FRIENDS',
    GET_ONLINE_USERS = 'GET_ONLINE_USERS';


export default function(state = {}, action) {
    console.log('in reducer. this is the aciton:', action);
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
        console.log(action);
        state = Object.assign({}, state, {
            foundFriends: action.foundFriends
        });
    }


    if(action.type == GET_ONLINE_USERS) {
        console.log(action);
        state = Object.assign({}, state, {
            users: action.users
        });
    }
    console.log('state in reducer', state);
    return state;
}
