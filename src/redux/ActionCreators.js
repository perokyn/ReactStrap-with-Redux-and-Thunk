import * as ActionTypes from './ActionTypes'


export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,  //defining type declared in actiontypes.js as string export (constants)
    payload: {
        campsiteId: campsiteId,   //payload  OBJECT is created from arguments. Remember if args are the same name as object pros..it is possible to write just the arg names camsiteID, without camsiteID:capsiteID (in ES6)
        rating: rating,
        author: author,
        text: text
    }
});