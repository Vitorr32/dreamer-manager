import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { createStore } from 'redux'

import rootReducer from './root_reducer';
import logger from 'redux-logger'
// import { applyMiddleware } from '@reduxjs/toolkit';

const middlewares = []

if (process.env.NODE_ENV === 'development') {
    //Set Development only middlewares
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default configureStore({  reducer: {}})