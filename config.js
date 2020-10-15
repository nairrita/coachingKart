import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBUF1UbQ0hoGL0VKrYTHiPpL6xSt0_T-uw",
  authDomain: "project-96fdb.firebaseapp.com",
  databaseURL: "https://project-96fdb.firebaseio.com",
  projectId: "project-96fdb",
  storageBucket: "project-96fdb.appspot.com",
  messagingSenderId: "964350537993",
  appId: "1:964350537993:web:2c5c66b76284d72cef23d8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
