import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Register, Login, Logo } from '../welcome';
import { App } from '../app';



const authRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
);


let route;
if (location.pathname == '/welcome/') {
    route = authRouter;
} else {
    route = <Logo />
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
