const initState={
    user:[
        {id:1, fName:"John", company:"ECU"},
        {id:2, fName:"Jack", company:"IBM"},
        {id:3, fName:"Kelly", company:"NXU"}
    ]
}

const projectReducer = (state = initState,action) => {
    switch(action.type){
        case 'CREATE_PROFILE':
            console.log('Created Profile',action.profile);
            return state;
        case 'CREATE_PROFILE_ERROR':
            console.log('create profile error',action.e);
            return state
        default:
            return state
    }
}
export default projectReducer