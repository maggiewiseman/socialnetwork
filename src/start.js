import React from 'react';
import ReactDOM from 'react-dom';



class Welcome extends React.Component {
    render() {
        return (
            <div>Hello, World! <Register /></div>
        );
    }
}

class Register extends React.Component {
    render() {
        return <div>Hi!</div>;
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
