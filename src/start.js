import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './welcome';
import { Registration, Login} from './auth-form';
import App from './app';
import Profile from './profile';

const authRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);

const appRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            // <Route path="/login" component={Login} />
             <IndexRoute component={Profile} />
        </Route>
    </Router>
);


let route = authRouter;
if (location.pathname == '/') {
    console.log('path = / route = appRouter');
    route = appRouter
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
