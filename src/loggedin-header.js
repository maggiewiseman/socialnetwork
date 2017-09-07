import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo';
import {Link} from 'react-router';


export default function Header() {

    return (
        <nav>
            <Logo />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
        Logout
        </button>
    );
}
