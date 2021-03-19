import { COMMENTS } from '../shared/comments';//data source
import * as ActionTypes from './ActionTypes';


//reducer for comments data
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;//payload object is defined in action creators addComment
            comment.id = state.length; ///adding new object properties to payload 
            comment.date = new Date().toISOString();//adding date to payload
            return state.concat(comment); //remember state is set to datat in CAMPSITES from shared folder. DO NOT MUTATE STATE directly. concat adds this object
                                         //to the end of the data array defined as CAMPSITES exported in campsites.js in shared folder. Concat does not muatte the state like push on an array method

        default:
            return state;
    }
};
