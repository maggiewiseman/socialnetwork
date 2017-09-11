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
## Day 3
* App component
* Profile Pic  
* Logo  
* Pic Upload

When user clicks on it you should make a view show an option for Upload
When user clicks a state property on app gets set and then app figures out that it needs to show this modal to upload an image.
When app loads needs to make an ajax request to get information about the logged in user.
App needs to feed to the profile pic the url for the profile pic, as well as the first and last name to go in the alt tag
After we do the upload it needs to tell App what the url for the new image is and app should set the url in its own state and that should refresh the profile pic.
Upload made an ajax request, saved it to uploads directory, send it to aws,

If you have data that you need right away, when/how do you do an ajax request?
The constructors is not the place to do this b/c of a time gap between constructing and putting it in the dom.
* Something getting into the page in React speak is called "mounting".
* React components hae lifecycle methods:
    * give componentDidMount() to class and it will run as soon as the component mounts w/out having to

## Day 4:
* If they are not logged in they go to /welcome

## CSURF:
Why does the app component need to make an ajax request? Why not use session data? B/c you need to verify that the user hasn't messed with the session and the only way to do that is to know what the hash is for the session and you'd have to give the hash to the client and that just isn't advisable at all.

httpOnly: true means that the cookie cannot be read in the browser so that they can't be used in cross server scripting attack
httpOnly: false means you can read cookie in the browser

secure: true cookie only sent over https!
secure: process.env.NODE_ENV == 'production'

Another reason we don't want cookies to appear in the browser is if a nefarious actor can read those session cookies they can use them to send requests to our server and do all kinds of things we don't want them to do.

CSURF PROTECTION with Axios
t cookie is the csurf token

with single page sites getting the token is problematic
* we could put it in app state and send it with each request
* if you were using jquery you could set configs for ajax requests
* I don't want to type this for all ajax requests. Axios has a way where you can create a copy of axios

```javascript
axios.get({
    url: '',
    'xsrfCookieName' : 'cookieName',
    'xsrfHeaderName' : 'csrf-token'
});


import axios from 'axios';

export default var instance = axios.create({

        'xsrfCookieName' : 'cookieName',
        'xsrfHeaderName' : 'csrf-token'

})

//make sure to import axios from './axios'
```

## Part 5:
Other user profiles

this.props.params.id property when url is user/:id

race condition:
Can't use app.state data

user/your id see a version of the profile that you cannot edit the bio, but if you want to chec that you are that user, need to detect that the ids are the same and redirect to the other page.

if you don't have the id yet, you can't compare so check on the server.

When you are at the route user/:id, if you click a link that goes to users/:differentId it keeps the old profile and just gives it new props and you won't see any change bc the component is already mounted.
A new lifecycle method is componentWillReceiveProps you can then do an axios request to get new userInfo and set state???

## Make friend request button:
Button Component:
- needs to know the relationship between the user and the profile being viewed.
- how to store that info?
- the button component make an ajax request to get status of this user vs logged in user OR
- you can return that information with the other user's profile

- friendOptions: {
    canAccept: true
}

- push button and make ajax request... need to know what button should say and if you know that you can know the url
- click the button and give the ajax request the userId and so given a current status (which it can get from db), there's always only one thing.  If it's pending make it accepted.  If it is accepted make it terminated.  If it doesn't exist, make it pending.
Status:
accepted
rejected
cancelled
terminated
pending

Make Friend request
Accept Friend request
Cancel Friend request
End Friendship
