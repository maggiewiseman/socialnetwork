import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const LogoFig = styled.figure`

    padding: 0.5em;

    width: ${props => props.location == 'nav' ? '100px' : '400px'};
    height: ${props => props.location == 'nav' ? '100px' : '400px'};
    display: inline-block;

    > img {
        width: 100%;
        height: 100%;
    }
`;


export default class Logo extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <LogoFig location={this.props.location}>
                <img src={this.props.url} alt="logo" />
            </LogoFig>
        );
    }
}
