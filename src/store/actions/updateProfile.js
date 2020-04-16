export const updateProfile = (profile) =>{
    return(dispatch, getState,{firebase}) => {
        //make asyn call to database
        const firestore = firebase.firestore();
        const id = getState().firebase.auth.uid.toString();
        firestore.collection('user').doc(id).update({          // fields and values to be added in the database
            ...profile
        }).then(() => {
            dispatch({type:'CREATE_PROFILE',profile});
        }).catch((e) => {
            dispatch({type:'CREATE_PROFILE_ERROR',e})
        })
    }
};

export const updateConnection = (profile,uid) =>{
    return(dispatch, getState,{firebase}) => {
        //make asyn call to database
        console.log(uid);
        const firestore = firebase.firestore();
        firestore.collection('user').doc(uid).update({          // fields and values to be added in the database
            ...profile
        }).then(() => {
            dispatch({type:'CREATE_PROFILE',profile});
        }).catch((e) => {
            dispatch({type:'CREATE_PROFILE_ERROR',e})
        })
    }
};