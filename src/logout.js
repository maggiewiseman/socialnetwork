import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from './axios';

const LogoutLink = styled.a`
    :hover {
        cursor: pointer;
    }
`;
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
            <LogoutLink className='logout-btn' onClick={this.logout}>Logout</LogoutLink>
        );
    }

}
