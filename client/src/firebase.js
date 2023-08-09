import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const FIREBASE_API_KEY = process.env.REACT_APP_CLIENT_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_CLIENT_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_CLIENT_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_CLIENT_FIREBASE_STORAGE_BUCKET;
const FIREBASE_SENDER_ID = process.env.REACT_APP_CLIENT_FIREBASE_SENDER_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_CLIENT_FIREBASE_APP_ID;

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_SENDER_ID,
	appId: FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export default firebase;
