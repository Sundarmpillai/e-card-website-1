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

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "https://localhost/finishSignUp?cartId=1234",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};

export const register = (newUser) => {
  return (dispatch, getState, { firebase }) => {
    const firestore = firebase.firestore();
    // firebase
    //   .auth()
    //   .sendSignInLinkToEmail(newUser.eM, actionCodeSettings)
    //   .then(function () {
    //     // The link was successfully sent. Inform the user.
    //     // Save the email locally so you don't need to ask the user for it again
    //     // if they open the link on the same device.
    //     window.localStorage.setItem("emailForSignInECard", newUser.eM);
    //   })
    //   .catch(function (error) {
    //     // Some error occurred, you can inspect the code: error.code
    //     console.log(error);
    //   });

    // // Confirm the link is a sign-in with email link.
    // if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    //   // Additional state parameters can also be passed via URL.
    //   // This can be used to continue the user's intended action before triggering
    //   // the sign-in operation.
    //   // Get the email if available. This should be available if the user completes
    //   // the flow on the same device where they started it.
    //   var email = window.localStorage.getItem("emailForSignInECard");
    //   if (!email) {
    //     // User opened the link on a different device. To prevent session fixation
    //     // attacks, ask the user to provide the associated email again. For example:
    //     email = window.prompt("Please provide your email for confirmation");
    //   }
    //   // The client SDK will parse the code from the link for you.
    //   firebase
    //     .auth()
    //     .signInWithEmailLink(email, window.location.href)
    //     .then(function (result) {
    //       // Clear email from storage.
    //       window.localStorage.removeItem("emailForSignInECard");
    //       // You can access the new user via result.user
    //       // Additional user info profile not available via:
    //       // result.additionalUserInfo.profile == null
    //       // You can check if the user is new or existing:
    //       // result.additionalUserInfo.isNewUser
    //       console.log(result.user);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       // Some error occurred, you can inspect the code: error.code
    //       // Common errors could be invalid email and invalid or expired OTPs.
    //     });
    // }
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
    console.log(typeof emailAddress);

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        console.log("DONE");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
