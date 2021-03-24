import * as ActionTypes from './ActionTypes';
// import { PARTNERS } from '../shared/partners';//data source

// export const Partners = (state =  PARTNERS, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };




//REDUCER FOR PARTNERS STATE 
//state (if not already exists) is equal to object with isloading, errMess and camsites[] array 
export const Partners = (state = {
    isLoading: true,
    errMess: null,
    partners: []
}, action) => {
switch (action.type) { //swithcing action types
    case ActionTypes.ADD_PARTNERS:
        return {...state, isLoading: false, errMess: null, partners: action.payload};//..state spreading state objects and updating fields: isoading errMess and campsites
    case ActionTypes.PARTNERS_LOADING:
        return {...state, isLoading: true, errMess: null, partners: []};// if data is still loading (dispatched action from actionCreateors.js) set the camsites to an empty array (since no data)
    case ActionTypes.PARTNERS_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};

///intialzie state to be data imported from CAMPSITES if state does not already exists
