# Redux

* you can use it without React!
* very small library that does a thing well
* when fb introduced react, they introduced a paradigm for how data in a react app should flow and they caled this architecture: flux.  Flux is how data is kept in the react app.
* We have been thinking of data as state, but now we are going to refer to global state and local (component based) state.  
* There's many different ways to implement a flux architecture.
    * the basic idea is that the data is in stores
    * whenever anything happens you dispatch an action and the action results in an action in the stores, the stores update and then the data flows to the ui.
    * the core of redux is that there is only 1 store, not many stores. So Redux gives you global state.
        * its inclusive of data of the kind you store in the database (application data)
        * and the UI state info (what view are we displaying, what tab are we on, is the uploader dialog visible?)
* All flux-y ideas tend to give them names that end in x or ux.
* There's the idea of saving a ton of data in one object lets you handle network outage and remember where it was. Lets you keep a long record for undoing actions. Need to save it local storage or every once in awhile save the state object in a db.
* The real advantage is that it makes it alot easier to know what is going on b/c there is a single holder of all the data.

# Actions/ Action Creators
* functions that create Actions
* actions are plain JS objects that describe something that happens.  They are are just plain normal JS objects that describe something that aught to have an impact on your state.
* all have a property that describe what kind of action it is
* common to have additional properties that are necessary for the completion of the action
* an action creator returns one of these action objects. So every object needs an action creator.  
* The normal pattern: for every action you might want you create an action_creator
* the dispatching of an action is like triggering an event.  
* the function that runs is called the reducer.

```javascript
//Action
{
    type: 'UPDATE_BIO',
    bio: 'I never liked a man I did not meet'
}

//Action Creator:
function updateBio(bio) {
    return {
        type: 'UPDATE_BIO',
        bio: bio
    };
}

```

# reducer
* functions that run: they receive an action and they receive the current state object and they return a new state object
* The hardest part of redux to get: for redux to work correctly - a reducer needs to be a pure function.
* Why do we do this?
    * Philosophical: pure functions are easier to reason about, argue about and debug. Complication comes from multiple functions being able to change the same object. How can you reason about the effect one function will have if you aren't sure what the other function did to it?  Mutability leads to confusion. To reduce complexity, make everything immutable.
    * Practical reason: redux needs to detect changes and for efficiency it does tests for shallow equality.  
* better name for reducer is a stateReplacer

Example of Pure function
```javascript

var a = [10, 20, 30];
var b = a.map(function(num) {
    return num * 10;
});

a //[10, 20, 30]
b //[100, 200, 300]

```

* in response to an event call dispatch and pass it an action  creator which returns an action
* dispatch(actionCreator(something))
* the action + state go into the reducer and the  reducer produces a new state and replaces it.
* there's only one reducer in your project but it might have a bunch of functions...
* one function that gets passed to createStore in the beginning
*




```javascript
upateBio(newBio) {
    return {
        type: 'UPDATE_BIO',
        newBio
    }
}
dispatch(updateBio(e.target.value))
```

folder named
* actions
* reducers

Put all related components:
* userProfile directory with one file with all the related reducers and another file to get related actions.

# The Store
* Main entrypoint into Redux is the store
* the Store contains the state and it also has useful methods like
    * dispatch
    * subscribe (send callback that will inspect new state)
    * getState

# Middleware
* gets processed at end of dispatch and before reducer.
* we are going to use redux-promise b/c this means the action creator will return a promise and allows us to do async actions.
* So our action creator might do an ajax request and then it will create the action and start processing through the reducer.


```javascript
import { connect } from 'react-redux';

//What properties from the store you want passed to the component as props?
//dispatch is also a prop that will be sent in to use for event handling
const mapStateToProps = function(state) {
    return {
        bio: state.user && state.user.bio
    };
};


const connectBio = connect(mapStateToProps);

//passing the presentational component
export const ConnectedBio = connectBio(Bio);

function Bio(props) {
    return (
        <div className="bio">
            {props.bio || 'Please add your bio'}
        </div>
    );
}

//online you will see:
const ConnectedBio = connect(mapStateToProps)(Bio);
```

* the gist is that 1) when an event happens we want to have access to the dispatch function. We pass this an action creator which will create an action object that then gets filtered through the reducer. The action and state are given to the reducer and the reducer makes a new state based on what the action was.

* so we need to make a connected component. So we have a component that renders some stuff based on state.  We need to make a connected component that basically takes our original component and sends specific state properties to it

    mapStateToProps = function(state) {
        return {
            and object with state properties
        }};

    Then we make the connected component by importing connect from redux and saying
    var connectedComponent = connect(mapStateToProps)(Component).

    Now the connected component will receive state props when it is instantiated and will also receive the dispatch function.

    So now we can define what actions we want the dispatch function to do when an event happens and we will make action creators in the actions file to do so.
    Then we will update the reducer file to handle the various actions.
    Generally the action creators will have db calls.

    So in our friends scenario we will have a friends component.
    We will send that component through the connection logic to make a connected component.
    Then we will render the friends page which will render each friend with a button and each pendingFriend with a button.
    The friend object is like the user object and should be sent props that include the events that we will need to add to the buttons.
    If we need to send an id, make sure the prop is sent as an arrow function or bound and id is the param of the arrow function.
    Then in the friend object send the event that came with props to the onClick method of the button in the render function and send in relevant params (like id)
