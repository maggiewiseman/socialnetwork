const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';

export default function(state = {}, action) {
    console.log('in reducer. this is the aciton:', action);
    if (action.type == RECEIVE_FRIENDS) {

        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    console.log('state in reducer', state);
    return state;
}
