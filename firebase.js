import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBnC443VHn-UGfwfdu3JvhHtF-2wUXFWTo',
  authDomain: 'chat-3-1cd6e.firebaseapp.com',
  projectId: 'chat-3-1cd6e',
  storageBucket: 'chat-3-1cd6e.appspot.com',
  messagingSenderId: '159908713769',
  appId: '1:159908713769:web:c6f0be9e847fb223151338',
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
