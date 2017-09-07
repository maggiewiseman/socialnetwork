import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Welcome from './welcome';
import { Registration, Login} from './auth-form';
import App from './app';

const authRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);


let route = authRouter;
if (location.pathname == '/') {
    console.log('path = / route = app');
    route = <App />;
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
