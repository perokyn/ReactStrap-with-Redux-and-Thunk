//import { CAMPSITES } from '../shared/campsites';//data source
import * as ActionTypes from './ActionTypes';

//REDUCER FOR CAMPSITES STATE 
//state (if not already exists) is equal to object with isloading, errMess and camsites[] array 
export const Campsites = (state = {
    isLoading: true,
    errMess: null,
    campsites: []
}, action) => {
switch (action.type) { //swithcing action types
    case ActionTypes.ADD_CAMPSITES:
        return {...state, isLoading: false, errMess: null, campsites: action.payload};//..state spreading state objects and updating fields: isoading errMess and campsites
    case ActionTypes.CAMPSITES_LOADING:
        return {...state, isLoading: true, errMess: null, campsites: []};// if data is still loading (dispatched action from actionCreateors.js) set the camsites to an empty array (since no data)
    case ActionTypes.CAMPSITES_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};

///intialzie state to be data imported from CAMPSITES if state does not already exists
