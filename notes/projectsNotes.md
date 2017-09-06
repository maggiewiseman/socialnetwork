# Registration
* using a library that is just for ajax b/c we aren't using jquery called Axios. It's promised-based.

```javascript
import axios from 'axios';
//theresponse object will have lots of fields that we don't want.  The response we want is res.data.
axios.get('/profile').then(res => {

});

this.handleChange = this.handleChange.bind(this);
///in component
submit() {
    axios.post('/register', {
        first: this.firstName,
        last: this.lastName
    }).then(resp => {
        const data = resp.data;
        location.
        if(!data.success){
            this.setState(error.true)
        }
    })
}
handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}
render() {
    return (
        {this.state.error && <div>Error</div>}
        <input name="first" onChange={e => this.handleChange(e)}
        <input name="last" onChange={this.handleChange} />
        <button name="submit" onChange={(e) => this.submit()}
    )
}

```
* we need three components:
    * Welcome Component with Logo with registration component
    * Registration Component
        * needs to be a class, can't be a function
    *


START JS MUST KNOW IF THE USER IS LOGGED IN OR NOT because it has to figure out what to render
Yes: logged in: render Logo
No: send error

Once you know if they are logged in:
location.replace('/')

## Part 2
* add login functionality
* create a login component
* if error, render this red text
* to display an error:
    - set a state as tehy type in the form. If on submit, check for errors client side

## React Router
* we are using version 3 / syntax supported by version 3 b/c version 4 is not that stable and the syntax kinda looks like a total rewrite.
* install react-router if it is not already installed

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Registration, Login } from './welcome';,


const router = (
    <Router history={hashHistory}> //pass the browser history or hashHistory into the router
        //the route is what you think it is, but you can set up parent and child relationships
        //
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            //IndexRoute is what you want to appear first!
            <IndexRoute component={Registration} /> //this is the first thing to replace props.children
  	</Route>
    </Router>
);

//pass the router rather than the app...
ReactDOM.render(router, document.querySelector('main'));


------------------------------
function Welcome(props) {
	return (
		<div>
      			<h1>Welcome to this site!</h1>
      			{props.children} // if the url is / the index route will be loaded which will be registration
      		</div>
  	);
}

```
