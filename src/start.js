import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Welcome extends React.Component {
    render() {
        return (
            <div>
                <figure class="welcome logo">
                    <img id="logo" src="/img/book_with_cloud_logo.png" alt="logo" />
                </figure>
                <Register />
            </div>
        );
    }
}

class Register extends React.Component {
    submit(e) {

        console.log(this.state.firstName);
        // axios.post('/register', {
        //     firstName: ''
        // });
    }
    handleChange(e) {
        console.log('setting state');
        //console.log(e.target.name);
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    render() {
        return (<div className='register-div'>
            <input type="text" name="firstName" placeholder="First Name"  onChange={e => this.handleChange(e)}/>
            <input type="text" name="lastName" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
            <input type="E-mail" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
            <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)}/>
            <button type="submit" name="registerBtn" onClick={e => this.submit(e)}>Submit</button>
        </div>);
    }

}

class Logo extends React.Component {
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

ReactDOM.render(
    <Welcome />,
    document.querySelector('main')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
//
// ReactDOM.render(
//     <Welcome />,
//     document.querySelector('main')
// );
//
// class Welcome extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button type="submit" name="registerBtn">Submit</button>
//             </div>
//         );
//     }
//
// }
