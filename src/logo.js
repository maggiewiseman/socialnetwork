import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const LogoFig = styled.figure`
    border: solid #7A4519 3px;
    padding: 0.25em;

    width: ${props => props.nav ? '100px' : '400px'};
    height: ${props => props.nav ? '100px' : '400px'};

    > img {
        width: 100%;
        height: 100%;
    }
`;


export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <LogoFig nav>
                    <img src="/img/dogBookLogo.png" alt="logo" />
                </LogoFig>
            </div>
        );
    }
}
