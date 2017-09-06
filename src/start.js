import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Registration, Login, Logo } from '../welcome2';
import { App } from '../app';


console.log(Login);


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
    route = <Logo />
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
