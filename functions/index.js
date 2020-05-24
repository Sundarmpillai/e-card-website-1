const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

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

//Function that will be triggered when a user's profile is
// updated by the user or the admin
exports.profileUpdated = functions.firestore
  .document("user/{userID}")
  .onWrite((change, contex) => {
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

    if (document.conn.length > prevDoc.conn.length) {
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

//Function that will be triggered when the user creates their accounts
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

//check the grpah data for every 20 updates
exports.checkGraph = functions.firestore
  .document("Graph/{userID}")
  .onWrite((change, contex) => {
    const document = change.after.exists ? change.after.data() : null;
    // const prevDoc = change.before.data();
    let x = new Date();
    let day = x.getDay() === 0 ? 7 : x.getDay();
    const list = [];
    let conn = 0;
    let users = 0;
    return admin
      .firestore()
      .collection("user")
      .get()
      .then(function (snapshot) {
        snapshot.forEach(function (doc) {
          list.push(doc.data());
          conn = conn + doc.data().conn.length;
        });
        users = list.length;
        const newData = {
          noConn: conn,
          noUser: users,
        };

        console.log(newData);
        if (document.noUser !== users || document.noConn !== conn) {
          return admin
            .firestore()
            .collection("Graph")
            .doc(day.toString())
            .update({ ...newData });
        }
        return 0;
      });
  });

// When a user adds a new connection or when a new user creates an account in the ssytem
// the data that are shown in the graphs will be updated.
exports.updateGraph = functions.firestore
  .document("user/{userID}")
  .onWrite((change, contex) => {
    const document = change.after.exists ? change.after.data() : null;
    const prevDoc = change.before.data();
    let day = new Date();
    let x = day.getDay() === 0 ? 7 : day.getDay();
    let now = day.getDay() === 0 ? 7 : day.getDay();
    let prevData = [];
    let prevConn = [];

    if (document.conn.length !== prevDoc.conn.length) {
      if (document.conn.length > prevDoc.conn.length) {
        if (now === 7) {
          return admin
            .firestore()
            .collection("Graph")
            .get()
            .then(function (snapshot) {
              snapshot.forEach(function (doc) {
                prevData.push(doc.data().noUser);
                prevConn.push(doc.data().noConn);
              });
              const newData = {
                prevD: prevData,
                prevC: prevConn,
                noConn: parseInt(prevConn[now - 1]) + 1,
                noUser: parseInt(prevData[now - 1]),
              };
              console.log(newData);

              return admin
                .firestore()
                .collection("Graph")
                .doc(now.toString())
                .update({ ...newData });
            });
        }
        return admin
          .firestore()
          .collection("Graph")
          .doc(x.toString())
          .get()
          .then((snapshot) => {
            let doc = snapshot.data();
            let conn = parseInt(doc.noConn) + 1;
            let users = doc.noUser;

            const newData = {
              noConn: conn,
              noUser: users,
            };
            return admin
              .firestore()
              .collection("Graph")
              .doc(x.toString())
              .update({ ...newData })
              .then((seq) => {
                return admin
                  .firestore()
                  .collection("Graph")
                  .doc((x + 1).toString())
                  .update({ ...newData });
              });
          });
      } else {
        if (now === 7) {
          return admin
            .firestore()
            .collection("Graph")
            .get()
            .then(function (snapshot) {
              snapshot.forEach(function (doc) {
                prevData.push(doc.data().noUser);
                prevConn.push(doc.data().noConn);
              });
              const newData = {
                prevD: prevData,
                prevC: prevConn,
                noConn: parseInt(prevConn[now - 1]) - 1,
                noUser: parseInt(prevData[now - 1]),
              };

              console.log(newData);

              return admin
                .firestore()
                .collection("Graph")
                .doc(now.toString())
                .update({ ...newData });
            });
        }
        return admin
          .firestore()
          .collection("Graph")
          .doc(x.toString())
          .get()
          .then((snapshot) => {
            let doc = snapshot.data();
            let conn = doc.noConn - 1;
            let users = doc.noUser;

            const newData = {
              noConn: conn,
              noUser: users,
            };

            return admin
              .firestore()
              .collection("Graph")
              .doc(x.toString())
              .update({ ...newData })
              .then((seq) => {
                return admin
                  .firestore()
                  .collection("Graph")
                  .doc((x + 1).toString())
                  .update({ ...newData });
              });
          });
      }
    }

    return 0;
  });
