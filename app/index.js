import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './containers/app';
import reducers from './reducers';

const middleware = [thunk, createLogger()];
const store = createStore(reducers, {}, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('#root')
);