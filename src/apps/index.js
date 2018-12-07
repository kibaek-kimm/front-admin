import App from '../containers/App'
import React from 'react'
import reactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import appReducer from '../reducers'

const store = createStore(appReducer);

reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);