//import { CAMPSITES } from '../shared/campsites';//data source
import * as ActionTypes from './ActionTypes';

//REDUCER FOR CAMPSITES STATE 
//state (if not already exists) is equal to object with isloading, errMess and camsites[] array
//this reducer takes in 2 argiuments, the first is state, second is action
export const Campsites = (state = { //state= intialize state here. state is an object--> state={ isloadeing: true etc}
    isLoading: true,
    errMess: null,
    campsites: []//campsites initialized as an empty string
}, action) => {
switch (action.type) { //swithcing action types (rmember actions coming from the view, action comes in as an object)
    case ActionTypes.ADD_CAMPSITES:///campsites is the actual payload hat replaces the empty array that was initialized above
        return {...state, isLoading: false, errMess: null, campsites: action.payload};//..state spreading state objects and updating fields: isoading errMess and campsites
    case ActionTypes.CAMPSITES_LOADING:
        return {...state, isLoading: true, errMess: null, campsites: []};// if data is still loading (dispatched action from actionCreateors.js) set the camsites to an empty array (since no data)
    case ActionTypes.CAMPSITES_FAILED://errorMess will be sent by the action s payload
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};

///intialzie state to be data imported from CAMPSITES if state does not already exists
///action types are basically telling the store to modify the state in the fashion as it is defined in the return statement eg.:  return {...state, isLoading: true, errMess: null, campsites: []};
//Getting action-->Modify State...This is how redux words /reducers