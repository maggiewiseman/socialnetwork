import React from 'react';
import ReactDOM from 'react-dom';


export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <figure class="main logo">
                    <img id="logo" src="/img/dogBookLogo.png" alt="logo" />
                </figure>
            </div>
        );
    }
}
