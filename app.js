import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Header } from './welcome';

export class App extends React.Component {
    render(props) {
        return (
            <div>
                <Header />
                <div>Make a friend!</div>
            </div>
        );
    }
}
