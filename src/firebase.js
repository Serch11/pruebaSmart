import * as firebase from 'firebase'; //npm i firebase

var   firebaseConfig = {
    apiKey: "AIzaSyDrAMBM5XOMxN8mLN2RNO178mU61ojS6p0",
    authDomain: "prueba-f2573.firebaseapp.com",
    databaseURL: "https://prueba-f2573.firebaseio.com",
    projectId: "prueba-f2573",
    storageBucket: "prueba-f2573.appspot.com",
    messagingSenderId: "267994731550",
    appId: "1:267994731550:web:949986287efe8b25c60a0f",
    measurementId: "G-2W9JBNEY19"
  };
  // Initialize Firebase
   var  fireDB = firebase.initializeApp(firebaseConfig);
   export default fireDB.database().ref();
  