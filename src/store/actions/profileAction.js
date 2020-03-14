export const createProfile = (profile) =>{
    return(dispatch, getState,{firebase}) => {
        //make asyn call to database
        const firestore = firebase.firestore();
        firestore.collection('user').add({          // fields and values to be added in the database
            ...profile,
            fN: 'Jack Sparrow',
            cmp:'KDU',
            eM:'jsparrow@gmail.com',
            pNo:parseInt('077292136')
        }).then(() => {
            dispatch({type:'CREATE_PROFILE',profile});
        }).catch((e) => {
            dispatch({type:'CREATE_PROFILE_ERROR',e})
        })


        // firestore.collection('user').doc('1').get()
        //     .then(doc => {
        //         if(doc && doc.exists){
        //             console.log(doc.id, '=>',doc.data());
        //             console.log(doc.data().conn);

        //         }
        //     })
        //     .catch(err =>{
        //         console.error("ERROR", err);
        //     })
    }
};