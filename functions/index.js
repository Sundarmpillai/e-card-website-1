const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const updateNotification = (notification, id) => {
  return admin
    .firestore()
    .collection("notify")
    .doc(id)
    .set({ ...notification });
};

function symmetricDifference(a1, a2) {
  var result = "";
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result = a1[i];
    }
  }
  for (i = 0; i < a2.length; i++) {
    if (a1.indexOf(a2[i]) === -1) {
      result = a2[i];
    }
  }
  return result;
}

exports.projectCreated = functions.firestore
  .document("user/{userId}")
  .onCreate((doc) => {
    const profile = doc.data();
    const notification = {
      content: "Added a new Project",
      user: `${profile.fN}``${profile.lN}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return admin
      .firestore()
      .collection("notify")
      .doc(doc.id.toString())
      .set({ ...notification });
  });

exports.profileUpdated = functions.firestore
  .document("user/{userID}")
  .onWrite((change, contex) => {
    console.log("ID");
    const document = change.after.exists ? change.after.data() : null;
    const prevDoc = change.before.data();

    if (document !== null && document.conn.length === prevDoc.conn.length) {
      const notification = {
        content: "has updated the profile",
        user: `${document.fN} ${document.lN}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return updateNotification(notification, change.after.id);
    }

    if (document.conn.length !== prevDoc.conn.length) {
      const userID = symmetricDifference(document.conn, prevDoc.conn);
      let doc = admin
        .firestore()
        .collection("user")
        .doc(userID)
        .get()
        .then((snapshot) => {
          doc = snapshot.data();
          const msg = "has been added to your connection.";
          const notification = {
            content: msg,
            user: `${doc.fN} ${doc.lN}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
          };

          return updateNotification(notification, change.after.id);
        });
    }
    return 0;
  });

exports.userJoined = functions.auth.user().onCreate((snap, context) => {
  return admin
    .firestore()
    .collection("user")
    .doc(snap.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: "Welcome to E-Card",
        user: `${newUser.fN} ${newUser.lN}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return admin
        .firestore()
        .collection("notify")
        .doc(doc.id.toString())
        .set({ ...notification })
        .then((doc) => console.log("Notification added", doc));
    });
});
