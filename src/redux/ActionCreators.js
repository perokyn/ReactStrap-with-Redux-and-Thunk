import * as ActionTypes from './ActionTypes'
import { CAMPSITES } from '../shared/campsites';//import data!

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,  //defining type declared in actiontypes.js as string export (constants)
    payload: {
        campsiteId: campsiteId,   //payload  OBJECT is created from arguments. Remember if args are the same name as object pros..it is possible to write just the arg names camsiteID, without camsiteID:capsiteID (in ES6)
        rating: rating,
        author: author,
        text: text
    }
});


//=========simulating server request for data=====

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());//<----hthis action is dispatched so that the component that is rendering campsites knows that the data is not yet loaded
//thi below would be the fects statememnt to retrieve CAMPSITES data from the server
    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

//=========handle load, failed to load and add events with the actions below=========
//no arg, simply and action to notify components to render loading cirle animation
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});
//takes error messages as arg and makes it payload in returned object
export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});
//takes campsites array as arg and makes it payload in returned object
export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});