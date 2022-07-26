import { configureStore } from '@reduxjs/toolkit'

import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';

const reducer = combineReducers({
    user: userReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = configureStore(
    {reducer:reducer},
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;