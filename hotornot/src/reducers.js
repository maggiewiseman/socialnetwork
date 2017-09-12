export default function(state = {}, action) {
    if (action.type == 'RECEIVE_USERS') {
        state = Object.assign({}, state, {
            users: action.users
        });
    }
    if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
        state = Object.assign({}, state, {
            users: state.users.map(function(user) {
                if(user.id == action.id) {
                    return Object.assign({}, user, {
                        hot: action.type == 'MAKE_HOT'
                    });
                } else {
                    return user;
                }
            })
        });
    }

    return state;
}
