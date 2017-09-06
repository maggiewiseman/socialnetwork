import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo';

export default function Header() {
    return (
        <nav>
            <Logo />
            <ul>
                <li><a href="/#home">Home</a></li>
                <li><a href="/#login">Login</a></li>
                <li><a href="/">Logout</a></li>
            </ul>
        </nav>
    );
}
