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
    submit() {
        console.log('submitted!');
        // axios.post('/register', {
        //     firstName: ''
        // });
    }
    render() {
        return (<div className='register-div'>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="E-mail" name="email" placeholder="E-mail"/>
            <input type="password" name="password" placeholder="Password"/>
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
