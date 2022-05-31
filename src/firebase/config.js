import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCPTEyTN4wx40QYRRH3KNEwi_TCwUCR4wA",
  authDomain: "the-dojo-94f6f.firebaseapp.com",
  projectId: "the-dojo-94f6f",
  storageBucket: "the-dojo-94f6f.appspot.com",
  messagingSenderId: "332453085967",
  appId: "1:332453085967:web:cfe5d63073dd294138f47a"
};

//init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, projectStorage, timestamp};