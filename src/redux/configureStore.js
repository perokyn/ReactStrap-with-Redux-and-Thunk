import { createStore, combineReducers, applyMiddleware } from 'redux'; //applyMiddleware is required to add middleware to redux
//Import reducers======================
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

import thunk from 'redux-thunk';//the redux middleware to use async requests, this also allows to use nested arrow functions as seen  in ActionCreators.js when disptching campsite data with simulated server delay (setTimeout)
import logger from 'redux-logger';

//The Redux createStore() function requires that all your reducers be combined into one single root reducer to be used as an argument to createStore(
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({ //import all reducers from .js files in redux folder and combine them to pass it to the store
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)//this is where add middlewares that are imported
    );

    return store;
};



