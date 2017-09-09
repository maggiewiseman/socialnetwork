import React from 'react';
import ReactDOM from 'react-dom';

import axios from './axios';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    logout() {
        axios.get('/logout').then(()=> {
            location.replace('/welcome/');
        });
    }
    render() {
        return (
            <a className='logout-btn' onClick={this.logout}>Log out</a>
        );
    }

}
