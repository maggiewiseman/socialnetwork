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

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    submit(e) {
        const {first_name, last_name, email, password } = this.state
        axios.post('/register', { first_name, last_name, email, password }).then(res => {
            location.replace('/');
            console.log(res);
        }).catch(e => {
            console.log(e.stack);
        });
    }
    handleChange(e) {
        console.log('setting state');
        //console.log(e.target.name);
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    render() {
        console.log('rendering registration');
        return (<div className='register-div'>
            <input type="text" name="first_name" placeholder="First Name"  onChange={this.handleChange}/>
            <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange}/>
            <input type="E-mail" name="email" placeholder="E-mail" onChange={this.handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
            <button type="submit" name="registerBtn" onClick={e => this.submit(e)}>Submit</button>
        </div>);
    }

}

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    submit(e) {
        const {first_name, last_name, email, password } = this.state
        axios.post('/login', { email, password }).then(res => {
            if(res.data.success) {
                console.log('LOGIN component login successful');
                location.replace('/');
            } else {
                this.setState({
                    error: res.data.error
                });
            }
        }).catch(e => {
            console.log(e.stack);
        });
    }
    handleChange(e) {
        console.log('setting state');
        //console.log(e.target.name);
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    render() {
        console.log('rendering registration');
        return (<div className='register-div'>
            {this.state.error && <div className="error">{this.state.error}</div>}
            <input type="E-mail" name="email" placeholder="E-mail" onChange={ this.handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
            <button type="submit" name="registerBtn" onClick={e => this.submit(e)}>Submit</button>
        </div>);
    }

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

// var pageToShow = <Logo />;
// if(location.pathname == '/Welcome') {
//     pageToShow = <Welcome />;
// }
//
// ReactDOM.render(
//     pageToShow,
//     document.querySelector('main')
// );
