import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Registration, Login } from '../welcome';


const router = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.querySelector('main'));
