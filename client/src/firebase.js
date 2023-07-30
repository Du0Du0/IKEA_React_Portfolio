import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCkHiLcZc9G1Be0xmrpuViCTRqeeO2-O5A',
	authDomain: 'ikea-react-main.firebaseapp.com',
	projectId: 'ikea-react-main',
	storageBucket: 'ikea-react-main.appspot.com',
	messagingSenderId: '853858853088',
	appId: '1:853858853088:web:449e3e876fc62f74d4f085',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
