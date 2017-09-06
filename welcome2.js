import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export function Header() {
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

export class Welcome extends React.Component {
    render(props) {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

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
                    console.log('Welcome2: error', res.data.error.detail);
                    let errorMsg = res.data.error.detail || res.data.error;
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
        {error && <div className="error">{error}</div>}
        <input type="text" name="first_name" placeholder="First Name"  onChange={handleInput}/>
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleInput}/>
        <input type="E-mail" name="email" placeholder="E-mail" onChange={handleInput}/>
        <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
        <button type="submit" name="registerBtn" onClick={submit}>Submit</button>
    </div>);
}

function LoginForm({ handleInput, submit, error }) {
    return (<div className='register-div'>
        {error && <div className="error">{error}</div>}
        <input type="E-mail" name="email" placeholder="E-mail" onChange={ handleInput}/>
        <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
        <button type="submit" name="registerBtn" onClick={e => submit(e)}>Submit</button>
    </div>);
}



export class Logo extends React.Component {
    render() {
        return (
            <div>
                <figure class="main logo">
                    <img id="logo" src="/img/book_with_cloud_logo.png" alt="logo" />
                </figure>
            </div>
        );
    }
}
