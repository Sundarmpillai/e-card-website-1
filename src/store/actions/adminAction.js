export const updateProfile = (profile) => {
  return (dispatch, getState, { firebase }) => {
    //make asyn call to database
    const firestore = firebase.firestore();
    const id = getState().firebase.auth.uid.toString();
    firestore
      .collection("user")
      .doc(id)
      .update({
        // fields and values to be added in the database
        ...profile,
      })
      .then(() => {
        dispatch({ type: "UPDATE_PROFILE", profile });
      })
      .catch((e) => {
        dispatch({ type: "UPDATE_PROFILE_ERROR", e });
      });
  };
};

export const updateConnection = (profile, uid) => {
  return (dispatch, getState, { firebase }) => {
    //make asyn call to database
    const firestore = firebase.firestore();
    firestore
      .collection("user")
      .doc(uid)
      .update({
        // fields and values to be updated in the database
        ...profile,
      })
      .then(() => {
        dispatch({ type: "UPDATE_PROFILE", profile });
      })
      .catch((e) => {
        dispatch({ type: "UPDATE_PROFILE_ERROR", e });
      });
  };
};

export const deleteUser = (uid) => {
  return (dispatch, getState, { firebase }) => {
    const firestore = firebase.firestore();
    const storage = firebase.storage().ref(uid);
    storage
      .listAll()
      .then(function (result) {
        result.items.forEach(function (file) {
          file.delete();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    firestore
      .collection("user")
      .doc(uid)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROFILE" });
      })
      .catch((e) => {
        dispatch({ type: "DELETE_PROFILE_ERROR", e });
      });
  };
};

export const uploadNews = (obj) => {
  return (dispatch, getState, { firebase }) => {
    const firestore = firebase.firestore();

    firestore
      .collection("news")
      .doc("msg")
      .update({
        ...obj,
      });
  };
};

export const updateContact = (obj) => {
  return (dispatch, getState, { firebase }) => {
    const firestore = firebase.firestore();
    firestore
      .collection("news")
      .doc("msg")
      .update({
        ...obj,
      });
  };
};
