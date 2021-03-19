import { CAMPSITES } from '../shared/campsites';//data source
//REDUCER FOR CAMPSITES STATE DATA
export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

///intialzie state to be data imported from CAMPSITES if state does not already exists
