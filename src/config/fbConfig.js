import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

const firebaseConfig = {
    apiKey: "AIzaSyAjGQfILFVUQ-43RDbe9TFsimGaxs508CQ",
    authDomain: "visiting-card-5b274.firebaseapp.com",
    databaseURL: "https://visiting-card-5b274.firebaseio.com",
    projectId: "visiting-card-5b274",
    storageBucket: "visiting-card-5b274.appspot.com",
    messagingSenderId: "1021119018796",
    appId: "1:1021119018796:web:bf745adb103c8c9ab95e89",
    measurementId: "G-9D5P6YB5X9"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({})

  export default firebase;