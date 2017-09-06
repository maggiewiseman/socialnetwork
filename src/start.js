import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Register, Login } from '../welcome';
import { App } from '../app';


const router = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
        <Route path="/home" component={App}>

        </Route>
    </Router>
);

ReactDOM.render(router, document.querySelector('main'));
