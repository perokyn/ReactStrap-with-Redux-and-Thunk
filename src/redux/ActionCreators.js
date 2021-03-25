import * as ActionTypes from './ActionTypes'
//import { CAMPSITES } from '../shared/campsites';//import data!


import { baseUrl } from '../shared/baseUrl'; ///<---base url for integrating forntend with js server




//EXAMPLE:
// export const addComment = (campsiteId, rating, author, text) => ({
//     type: ActionTypes.ADD_COMMENT,  //defining type declared in actiontypes.js as string export (constants)
//     payload: {
//         campsiteId: campsiteId,   //payload  OBJECT is created from arguments. Remember if args are the same name as object pros..it is possible to write just the arg names camsiteID, without camsiteID:capsiteID (in ES6)
//         rating: rating,
//         author: author,
//         text: text
//     }
// });



export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());//<----hthis action is dispatched so that the component that is rendering campsites knows that the data is not yet loaded
    //this below would be the fetch statememnt to retrieve CAMPSITES data from the server
    // setTimeout(() => {
    //     dispatch(addCampsites(CAMPSITES));
    // }, 2000);

    return fetch(baseUrl + 'campsites')//<---concatenated string to create path to db.js in server and laod campsites obj array
        .then(response => {
            if (response.ok) {//<---if there is a response.ok (response code in the 200 range) object then this returns true and returns teh response object
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);//<-if error then create a new error object and throw an error which will be captured by the catch statetemnt at the end
                error.response = response;
                throw error;
            }
        },
            error => {//Handle promise rejection
                const errMess = new Error(error.message);//if access rejeted without any response create another erro message and pass it to the catch error
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));//<---this will catch all thrown errors and also dispatehces the error action named as : campsitesFailed(error.message) with the message as an arg
    //remember campsitesFailed(error.message) is defined in ActionCretors.js {this file jsut below this section}
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

//=======================================================================================================
//========Fetching /Add comments from server REMEMBER: location is defined in baseUrl.js in shared folder


export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});




export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});



export const postComment = (campsiteId, rating, author, text) => dispatch => {

    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};







//=============================================================================================
//========Fetching promotions from server REMEMBER: location is defined in baseUrl.js in shared folder

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

//=============================================================================================
//========Fetching partners from server REMEMBER: location is defined in baseUrl.js in shared folder


export const fetchPartners = () => dispatch => {
    return fetch(baseUrl + 'partners')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};



export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});


//=================POST FEDBACK======================================//



export const postFeedback = (feedback) => dispatch => {

    const newFeedback = {
        feedback: feedback
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(() => alert('Thank you for your feedback!' + JSON.stringify(newFeedback)))
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};


