import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserLike({ keyReference }) {
  const [user, userLoading, userError] = useAuthState(auth);
  const [colorOfLike, setColorOfLike] = useState('');
  const likeRefTotal = collection(db, 'post', keyReference, 'like');
  const qLike = query(likeRefTotal);
  const [like, likeLoading, likeError, likeSnapshot] = useCollectionData(qLike);
  useEffect(() => {
    if (like) {
      const filterLike = like.map((item) => item.uid === user.uid);
      setColorOfLike(filterLike);
    }
  }, [like, user.uid]);
  const handleLike = async (item) => {
    const likeRefAddOrRemove = doc(db, 'post', keyReference, 'like', user.uid);

    const docRef = doc(db, 'post', keyReference, 'like', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(likeRefAddOrRemove);
    } else {
      await setDoc(likeRefAddOrRemove, {
        keyReference: keyReference,
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        key: uuidv4(),
        date: new Date(),
        timestamp: serverTimestamp(),
      });
    }
  };
  return (
    <div className="">
      <Button onClick={() => handleLike()}>
        <svg
          fill={colorOfLike.length ? 'red' : 'none'}
          viewBox="0 0 24 24"
          className={`w-4 h-4 mr-1  ${
            colorOfLike.length ? 'text-red-500' : ''
          }`}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </Button>
    </div>
  );
}

export default UserLike;
