import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import HotOrNot from './hotornot';
import Hot from './hot';
import Not from './not';

const store = createStore(reducer, applyMiddleware(reduxPromise));

const elem = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={HotOrNot} />
            <Route path="/hot" component={Hot} />
            <Route path="/not" component={Not} />
        </Router>
    </Provider>
);

ReactDOM.render(
    elem,
    document.querySelector('main')
);
