import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';

export default class Welcome extends React.Component {
    render(props) {
        console.log('rendering welcome');
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}
