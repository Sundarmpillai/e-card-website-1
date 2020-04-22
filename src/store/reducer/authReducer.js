const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_FAILED":
      return {
        ...state,
        authError: "Login failed",
      };
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return {
        ...state,
        authError: null,
      };
    case "LOGOUT_SUCCESS":
      console.log("Logout Success");
      return state;
    case "REGISTER_SUCCESS":
      console.log("Registered Successfuly");
      return {
        ...state,
        authError: null,
      };
    case "REGISTER_ERROR":
      console.log("Logout Failed");
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
