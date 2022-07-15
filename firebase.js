import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-OA2FRpdd7WMHxjdkswzAV7qP79QMbH0',
  authDomain: 'chat-2-ae13d.firebaseapp.com',
  projectId: 'chat-2-ae13d',
  storageBucket: 'chat-2-ae13d.appspot.com',
  messagingSenderId: '298347621691',
  appId: '1:298347621691:web:890a549bbd788909015b1e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
