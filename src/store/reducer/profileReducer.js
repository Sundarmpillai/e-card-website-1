const initState = {
  prof: [],
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROFILE":
      return state;
    case "CREATE_PROFILE_ERROR":
      return state;
    case "UPDATE_PROFILE":
      return state;
    case "UPDATE_PROFILE_ERROR":
      return state;
    case "DELETE_PROFILE":
      return state;
    case "DELETE_PROFILE_ERROR":
      return state;
    case "GET_PROFILE":
      return {
        ...state,
        prof: action.doc.data(),
      };
    default:
      return state;
  }
};
export default profileReducer;
