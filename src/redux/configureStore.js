import {createStore, combineReducers} from 'redux';
//Import reducers======================
import { Campsites } from './campsites'; 
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';


//The Redux createStore() function requires that all your reducers be combined into one single root reducer to be used as an argument to createStore(
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({  //import all reducers from .js files in redux folder and combine them to pass it tot he store
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
};