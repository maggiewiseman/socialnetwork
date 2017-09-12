
import axios from 'axios';

export function receiveUsers() {
    return axios.get('/users').then(function({ data }) {
        return {
            type: 'RECEIVE_USERS',
            users: data.users
        };
    });
}
