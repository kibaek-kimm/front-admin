import React from 'react'
import reactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './containers/App'
import appReducer from './reducers'

const storeWithMiddleware = applyMiddleware(thunk)(createStore)(appReducer);

console.log(storeWithMiddleware);


reactDOM.render(
    <Provider store={storeWithMiddleware}>
        <App />
    </Provider>,
    document.getElementById('app')
);