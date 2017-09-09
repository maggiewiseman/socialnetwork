import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo';
import {Link} from 'react-router';
import axios from 'axios';
import { Nav } from './styledComponents/wrapper';


export default function Header() {

    return (
        <Nav>
            <div>
                <Logo />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>

                </ul>
            </div>
        </Nav>
    );
}
