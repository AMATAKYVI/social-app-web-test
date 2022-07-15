import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

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

export default function UserComment({ item, postSnapshot, keyReference }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [user, userLoading, userError] = useAuthState(auth);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitComment = async (item) => {
    if (comment.length === 0) {
      return;
    }
    const commentRef = collection(db, 'post', keyReference, 'comment');
    const addComment = await addDoc(commentRef, {
      keyReference: keyReference,
      comment: comment,
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      key: uuidv4(),
      date: new Date(),
      timestamp: serverTimestamp(),
    });

    handleClose();
  };
  return (
    <div className="">
      <Button onClick={handleOpen}>
        {' '}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className="w-4 h-4 mr-1"
          stroke="currentColor"
          onClick={() => {}}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Post your comment
          </Typography>
          <div className="flex mt-2">
            <input
              type="text"
              name=""
              id=""
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="py-2 px-2 border rounded-lg border-black tracking-wide "
              placeholder="Commenting..."
            />
            <Button
              onClick={() => {
                handleSubmitComment(item);
              }}
            >
              Comment
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
