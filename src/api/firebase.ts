import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
    appId: process.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db }