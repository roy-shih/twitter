import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB1jayC8UE_HS7ac6rwATzcKKJ787KEuo",
  authDomain: "twitter-48a2e.firebaseapp.com",
  projectId: "twitter-48a2e",
  storageBucket: "twitter-48a2e.appspot.com",
  messagingSenderId: "944950951526",
  appId: "1:944950951526:web:b884dbdbe0883bc09377a7",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAv0KkDxc8UX7ZTXZ1XRScrTx1G_STDCtQ",
//   authDomain: "test-b2295.firebaseapp.com",
//   projectId: "test-b2295",
//   storageBucket: "test-b2295.appspot.com",
//   messagingSenderId: "99664874141",
//   appId: "1:99664874141:web:405e6f6bce6a2426f2a274"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };

export default db;
