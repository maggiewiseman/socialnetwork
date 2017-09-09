import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText, ErrorText } from './styledComponents/text';

//An alternative to manually writing the two wrapping components above would be to write a function that can be passed a component and returns a new component that wraps the one passed in.
export const Login = wrapInAuthForm(LoginForm, '/login');
export const Registration = wrapInAuthForm(RegistrationForm, '/register')

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
            console.log('state:', this.state);
            axios.post(this.state.url, this.state).then(res => {
                if(res.data.success) {
                    console.log('LOGIN component login successful');
                    location.replace('/');
                } else {
                    console.log('Welcome2: error');
                    let errorMsg = res.data.error || res.data.error;
                    this.setState({
                        error: errorMsg
                    });
                }
            }).catch(e => {
                console.log(e.stack);
            });
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

//the destructured params are the props that are sent in when the this component is instantiated
function RegistrationForm({ handleInput, submit, error }) {
    return (<div className='register-div'>
            <RegForm>
            <h1>Create a New Account</h1>
            <HintText>It is free, but you will not be able to delete it</HintText>
            {error && <ErrorText>{error}</ErrorText>}
            <NameInput type="text" name="first_name" placeholder="First Name"  onChange={handleInput}/>
            <NameInput type="text" name="last_name" placeholder="Last Name" onChange={handleInput}/>
            <LoginInput type="E-mail" name="email" placeholder="E-mail" onChange={handleInput}/>
            <LoginInput type="password" name="password" placeholder="Password" onChange={handleInput}/>
            <Button type="submit" name="registerBtn" onClick={submit}>Submit</Button>
        </RegForm>
    </div>);
}

function LoginForm({ handleInput, submit, error }) {
    return (<div className='register-div'>
        <RegForm>

            {error && <div className="error">{error}</div>}
            <LoginInput type="E-mail" name="email" placeholder="E-mail" onChange={ handleInput}/>
            <LoginInput type="password" name="password" placeholder="Password" onChange={handleInput}/>
            <Button center type="submit" name="registerBtn" onClick={e => submit(e)}>Submit</Button>
        </RegForm>
    </div>);
}
const RegForm = styled.div`
    background: hsla(27, 66%, 97%, 1);
    border: 1px solid hsla(27, 15%, 36%, 1);
    width: 400px;
    margin: 10px;
    padding: 20px;
    > * {
        margin: 5px 10px;
    }
`;

const NameInput = styled.input`
    padding: 6px;
    width: 150px;
    border: 1px solid hsla(27, 15%, 36%, 1);
`;

const LoginInput = styled.input`
    padding: 6px;
    width: 320px;
    margin-bottom: 10px;
    border: 1px solid hsla(27, 15%, 36%, 1);
    display: block;
`;
