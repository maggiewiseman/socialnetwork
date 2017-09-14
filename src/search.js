import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';



//An alternative to manually writing the two wrapping components above would be to write a function that can be passed a component and returns a new component that wraps the one passed in.
export const SearchNames = wrapInAuthForm(SearchForm, '/api/findAFriend');

function wrapInAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {url};
            this.handleInput = this.handleInput.bind(this);
            this.submit = this.submit.bind(this);

        }
        handleInput(e) {
            console.log('setting state');
            //console.log(e.target.name);
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        submit(e) {
            console.log(e);
        }
        render() {
            //when making a component to be rendered you say:
            //<componentName propertyThatWillBeKeyinPropsObject = valueofProperty anotherPropertyThatWillBeKeyinPropsObject = theOtherValue
            return <Component
                        error={this.state.error}
                        handleInput={this.handleInput}
                        submit={this.submit}
                    />;
        }
    };
}

function SearchForm({ handleInput, submit, error }) {
    return (
        <SearchDiv>
            <label forHTML=""></label>
            <input type="text" placeholder="Search" />
            <Button search>Search</Button>
        </SearchDiv>
    );
}
const SearchDiv = styled.div`
    background: hsla(27, 66%, 97%, 1);
    border: 1px solid hsla(27, 15%, 36%, 1);

`;
