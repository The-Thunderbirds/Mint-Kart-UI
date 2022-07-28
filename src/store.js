import { configureStore } from '@reduxjs/toolkit'

import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    user: userReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    productDetails: productDetailsReducer,
});

// convert object to string and store in localStorage
const saveToLocalStorage = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

let initialState = {};

const middleware = [thunk];

const store = configureStore(
    {reducer:reducer},
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;