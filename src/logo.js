import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Figure = styled.figure`
    border: solid #7A4519 3px;
    padding: 0.25em;
`;


export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <Figure>
                    <img src="/img/dogBookLogo.png" alt="logo" />
                </Figure>
            </div>
        );
    }
}
