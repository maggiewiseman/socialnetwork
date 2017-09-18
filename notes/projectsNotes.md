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

## Redux Day
* write a query that selects friends join on users where status is accepted and status is pending and where user id is in recipient column
* put one array in the state object
* on the page we will create two components: one for showing friends and one for showing friend requests
* use the function you pass to the reducer
* change action of button to use redux by replacing list of friends with new list of friends. So you should see the friend move from one section to another section.

* a nice to have feature is when connected component mounts the first time it needs to make an ajax request to get friends.  After that if you leave the friends route and come back see if the data is still in the store so you don't have to go back to database.


## Online Users:

Here's what is happening. I have set up the client to connect by make a function called Socket in a random file.  The Socket function is in my main app container and is able to pass the dispatch event that the app has (since it is a connected component) On the server I have also set up SocketIO in my server file where I basically get an io object.  Then on my sever I have an on connection event.  and it emits a welcome event. 

The client connects as soon as the user logs in because it is set to do this in the render function of the main app container. So then when I go to a particular route: onlineUsers
* The route for this future is going to be similar to friends
* The component displays the users
* get online user from the store and displays them
* socket.io for events of users coming and going and updating state accordingly


* Since we are doing redux, redux will be constantly updating events in the store in the background no matter if we are looking at online
* Hook up socket io on the server and when a socket connects, hook up a disconnet event.
* when a socket connects you don't want to at that time count the user as online because when the socket connects and you receive that event it would be difficult to figure out that user's id.
* we need to maintain a list of all the users that are online.
* keep online array, push object with id and socket id
* connection event doesn't have user id.
* the client should then make an ajax request to some route and that route
    * app.post('/connected/:socketId', (req, res) => {
            //send socketId and req.session.user.id
            test to see if there is an object already with that socketId and if there isn't, pass in an object.

         });
    * could be more than one connection for a given user
    * if users not already there then io.sockets.emit('userJoined')

## Day 2 of socket io stuff:
What I need to do today is 1) make it so that when a new user connects I emit an event userJoined.  But I only emit this event if the user id is not already in the list.  So on connection

* don't worry about client running out of memory, more concerned about memory running out on the server
* potential that someone could open millions of tabs, but they would have to have logins...
* just store two values in array, not user info b/c we still want to keep this array as small as possible.

io.sockets.sockets[socketId].emit('onlineUsers', )

getUsersByIds(ids).then(users =>
    io.sockets.emit('onlineUsers', users))

Building a query with an array:
2 ways but one is better for our purposes b/c it uses the $

//Sql will ignore any multiple id's.  (auto de-dupes)
const q = 'SELECT first_name, last_name, profile_pic, id FROM users WHERE id = ANY($1)'

The client should check for duplicate users.

Client listens for userJoined
Dispatch an action and reducer updates the list

On the server:
On the route...check loggedin
check to see if socket is already there and check to see that it is a valid socketid
push the user into the list of sockets
getUsersById then emit and online users event and send the list back to the client
if the user is not already there then emit an userJoined event.


Do once in App
const socket = io.connect();
.on connect event do the axios post... when to do this?
.on('userJoined'), userLeft, onlineUsers

the callbacks for these events should dispatch and action

need to make sure only do it once and only if user is logged in and do it in a way that it has a dispatch action.
the socket needs to be available to another element or at least the emit event needs to be available (the chat component)

Create a socket component
Declare a variable socket.
If it is undefined, you can

## Deficiencies in our social media
1. need additional benefit to being a friend
2. Let users adde links - get html back from a page and search for og-title and other meta tags.  A lot of sites use this structure. Could also use CheerioJS to help

## chat
Once you have socketIo going.  Need another server side event for when a chat message is received couldd name the vent chat. Two client side vents. One you could call chat for when any user sends a chate message. The server will broadcast to everyone a chat message event which triggers the server sending it to everyone.
On the client you will also need a chatmessages event. This is an event to send the list of the more recent 10 messages for people that connect to the chat.
To do the storing of the ten messages ont he server. The easiest is to keep 10 messages in memory in an array.
Could store in the database. Would need sender id, chat_id if you are going to to do private messages, date, message.
When a user sends a chat message you should not update the display right away. The client should already be listening...
When you receive a chat message from the user on the server. You will have a socket id.  You can use the socket id to find the user id from the list on the server and then do a dbquery to get the user info that you will use to display the message.
One detail... this is a situation where we want to actually interact with a DOM element. React does not make it easy to do this. IN react you don't manipulate DOM elements. You describe what you want with JSX and then it makes it.  Which is why we don't use jQuery... but there's sometimes when you need to.  And this chat business is where it happens. Everytime we show a new message we want to do some scrolling.
we have to use javascript to set the scroll position.  So we are going to need to interact with the dom element that holds the chat to manually set the scroll position each time a new message is

Put in an thml element a ref and the value is a function
Set a property on the component that keeps an updated reference to the dom
(
<div id="chat-messages" ref={(elem) => this.message = elem}

because it has the ref property, React calls it every time it updates that element and it passes the function the element.

componentDidUpdate runs after render function
and you will be able to manipulate the element using this.message (in this case) because you set it equal to the elem.

Do javascript to interact with the dom element
scrollheight - clientHeight

make sure the the new component has the socket or at least the emit function
add a key down, if the key is enter, emit the content
