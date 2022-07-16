import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import moment from 'moment';

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

export default function UserCommentSecond({
  item,
  keyReferenceOne,
  keyReferenceTwo,
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [user, userLoading, userError] = useAuthState(auth);
  const handleOpen = () => setOpen(true);
  const [colorOfLike, setColorOfLike] = useState('');
  const handleClose = () => setOpen(false);
  // comment level two
  const commetRefTotalTwo = collection(
    db,
    'post',
    keyReferenceOne,
    'comment',
    keyReferenceTwo,
    'comment'
  );
  const qCommentTwo = query(commetRefTotalTwo, orderBy('date', 'desc'));
  const [commentTwo, commentTwoLoading, commentTwoError, commentTwoSnapshot] =
    useCollectionData(qCommentTwo);
  const handleSubmitComment = async (item) => {
    if (comment.length === 0) {
      return;
    }
    const commentRef = collection(
      db,
      'post',
      keyReferenceOne,
      'comment',
      keyReferenceTwo,
      'comment'
    );
    const addComment = await addDoc(commentRef, {
      keyReferenceOne: keyReferenceOne,
      keyReferenceTwo: keyReferenceTwo,
      comment: comment,
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      key: uuidv4(),
      date: new Date(),
      timestamp: serverTimestamp(),
    });
    setComment('');
    handleClose();
  };
  return (
    <div className="">
      <div>
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
        </Button>{' '}
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
        <Button>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-1"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span>share</span>
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
      <div>
        {commentTwo?.map((item) => {
          return (
            <div
              key={`${item.keyReferenceOne}${item.uid}${item.key}`}
              className="px-10 py-2"
            >
              <div className="border-b border-black mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      src={item.photoURL}
                      className="rounded-full w-7"
                      alt=""
                    />
                  </div>
                  <div>
                    {item.timestamp
                      ? moment(item.date.toDate()).fromNow()
                      : 'Loading...'}
                  </div>
                </div>
                <div className="mt-2">
                  <h1 className="text-gray-800 px-10 py-2"> {item.comment}</h1>
                </div>
              </div>
              <div>One more nested here ?</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
