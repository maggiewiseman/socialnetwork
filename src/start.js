import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './welcome';
import { Registration, Login} from './auth-form';
import App from './app';
import Profile from './profile';
import OtherProfile from './otherProfile';
import Friends from './friends';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import reduxPromise from 'redux-promise';
import SearchResults from './searchResults';
import OnlineUsers from './onlineUsers';
import Chat from './chat';
import { composeWithDevTools } from 'redux-devtools-extension';


const authRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
const appRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Profile} />
                <Route path='friends' component={Friends} />
                <Route path="profile/:id" component={OtherProfile} />
                <Route path="searchResults" component={SearchResults} />
                <Route path="onlineUsers" component={OnlineUsers} />
                <Route path="chat" component={Chat} />

            </Route>
        </Router>
    </Provider>
);

let route = appRouter;
if (location.pathname == '/welcome/') {
    route = authRouter;
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
