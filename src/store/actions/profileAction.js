export const createProfile = (profile) => {
  return (dispatch, getState, { firebase }) => {
    //make asyn call to database
    const firestore = firebase.firestore();
    const id = getState().firebase.auth.uid.toString();
    firestore
      .collection("user")
      .doc(id)
      .set({
        // fields and values to be added in the database
        ...profile,
      })
      .then(() => {
        dispatch({ type: "CREATE_PROFILE", profile });
      })
      .catch((e) => {
        dispatch({ type: "CREATE_PROFILE_ERROR", e });
      });
  };
};
