import axios from 'axios';

export function receiveFriends() {
    //get friends
    axios.get('/getFriendships').then((results)=> {
        if(results.data.success == 200) {
            return {
                type: 'RECIEVE_FRIENDS',
                friends: results.friends
            };
        }
    }).catch(e => {
        console.log(e);
        this.setState({
            error: e
        });
    });
}
