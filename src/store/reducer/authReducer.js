const initState={
    authError: null
}

const authReducer = (state = initState,action) => {
    switch(action.type){
        case 'LOGIN_FAILED':
            return {
                ...state,
                authError:'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login Success');
            return{
                ...state,
                authError:null
            }
        case 'LOGOUT_SUCCESS':
            console.log('Logout Success')
        default:
            return state;
    }
}

export default authReducer