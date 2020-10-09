import firebase  from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
//import 'firebase/signInWithGoogle';


const firebaseConfig = {
    apiKey: "AIzaSyCUxkawvFo3Mz5E3jQCze1CvjpQvdEUBWQ",
    authDomain: "eggrollchenscorder.firebaseapp.com",
    databaseURL: "https://eggrollchenscorder.firebaseio.com",
    projectId: "eggrollchenscorder",
    storageBucket: "eggrollchenscorder.appspot.com",
    messagingSenderId: "116973374305",
    appId: "1:116973374305:web:c1ff383b32f98a3f24d320",
    measurementId: "G-4K43XHQMLV"
  };

  class Firebase {
    constructor() {
        try {
            firebase.initializeApp(firebaseConfig); 
            this.firestore = firebase.firestore();
            this.auth = firebase.auth(); 
            this.auth_ = firebase.auth;
            //this.functions = firebase.functions();
            //this.signInWithGoogle = firebase.signInWithGoogle();
              
        } 
        
        catch (err) {
            // we skip the "already exists" message which is
            // not an actual error when we're hot-reloading
            if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error raised', err.stack)
            }
        }
        
    }

    

  }


  export default Firebase;