
import axios from 'axios';

export function receiveUsers() {
    return axios.get('/users').then(function({ data }) {
        return {
            type: 'RECEIVE_USERS',
            users: data.users
        };
    });
}

export function makeHotAction(id) {
    return {
        type: 'MAKE_HOT',
        id
    };
}

export function makeNotAction(id) {
    return {
        type: 'MAKE_NOT',
        id
    };
}
