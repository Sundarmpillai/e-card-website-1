export const login = (credentials) => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILED", err });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      });
  };
};

export const register = (newUser) => {
  return (dispatch, getState, { firebase }) => {
    const firestore = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.eM, newUser.pwd)
      .then((resp) => {
        return firestore.collection("user").doc(resp.user.uid).set({
          fN: newUser.fN,
          lN: newUser.lN,
        });
      })
      .then(() => {
        dispatch({ type: "REGISTER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "REGISTER_ERROR", err });
      });
  };
};

export const resetPassword = (email) => {
  return (dispatch, getState, { firebase }) => {
    var auth = firebase.auth();
    var emailAddress = email.mail.toString();

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };
};
