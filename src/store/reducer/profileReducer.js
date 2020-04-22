const initState = {
  user: [
    { id: 1, fName: "John", company: "ECU" },
    { id: 2, fName: "Jack", company: "IBM" },
    { id: 3, fName: "Kelly", company: "NXU" },
  ],
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROFILE":
      console.log("Created Profile", action.profile);
      return state;
    case "CREATE_PROFILE_ERROR":
      console.log("Create profile error", action.e);
      return state;
    case "UPDATE_PROFILE":
      console.log("Updated Profile", action.profile);
      return state;
    case "UPDATE_PROFILE_ERROR":
      console.log("update profile error", action.e);
      return state;
    case "DELETE_PROFILE":
      console.log("profile deleted");
      return state;
    case "DELETE_PROFILE_ERROR":
      console.log("delete profile error", action.e);
      return state;
    default:
      return state;
  }
};
export default profileReducer;
