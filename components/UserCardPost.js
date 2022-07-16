import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import moment from 'moment';
import { collection, orderBy, query } from 'firebase/firestore';
import UserComment from './UserComment';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserLike from './UserLike';
import UserCommentSecond from './UserCommentSecond';
import { Button } from '@mui/material';
function UserCardPost({ item, loading, error, postSnapshot, keyReference }) {
  const [expanded, setExpanded] = useState(false);
  //comment level one
  const commetRefTotal = collection(db, 'post', keyReference, 'comment');
  const qComment = query(commetRefTotal, orderBy('date', 'desc'));
  const [comment, commentLoading, commentError, commentSnapshot] =
    useCollectionData(qComment);
  // comment level two
  // const commetRefTotalTwo = collection(
  //   db,
  //   'post',
  //   keyReferenceOne,
  //   'comment',
  //   keyReferenceTwo,
  //   'comment'
  // );
  // const qCommentTwo = query(commetRefTotalTwo, orderBy('date', 'desc'));
  // const [commentTwo, commentTwoLoading, commentTwoError, commentTwoSnapshot] =
  //   useCollectionData(qCommentTwo);
  //like level one
  const likeRefTotal = collection(db, 'post', keyReference, 'like');
  const qLike = query(likeRefTotal);
  const [like, likeLoading, likeError, likeSnapshot] = useCollectionData(qLike);

  return (
    <div className="">
      {loading ? (
        'loading now'
      ) : (
        <div className="pr-5 pl-10 bg-white/80 shadow-lg rounded-lg mx-4 md:mx-auto py-5 mb-2 mt-2 max-w-md md:max-w-2xl ">
          <div className="flex  px-4 py-2">
            <div>
              <img
                className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                src={`${item.photoURL}`}
                alt="avatar"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                  {item.name}
                </h2>
                <small className="text-sm text-gray-700">
                  {' '}
                  {item.timestamp ? moment(item.date.toDate()).fromNow() : ''}
                </small>
              </div>
              <p className="text-gray-700 text-xs ">
                {item.timestamp ? item.date.toDate().toLocaleString() : ''}
              </p>
              <p className="mt-3 text-gray-700 text-lg font-semibold tracking-wide border px-10 py-5 rounded-lg bg-white">
                {item.post}
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex items-center  text-gray-700 text-sm mr-3">
                  <UserLike
                    item={item}
                    postSnapshot={postSnapshot}
                    keyReference={keyReference}
                  />
                  <span>{like?.length}</span>
                </div>
                <div className="flex items-center  text-gray-700 text-sm mr-8">
                  <UserComment
                    item={item}
                    postSnapshot={postSnapshot}
                    keyReference={keyReference}
                  />
                  <span>{comment?.length}</span>
                </div>
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
              </div>
              <div className="text-black text-xs mt-2">
                {commentSnapshot?.docs.map((item) => {
                  return (
                    <div
                      className=" bg-gray-200 p-3 mb-1 rounded-lg"
                      key={`${item.id}${item.data().uid}`}
                    >
                      <div className="border-b border-black">
                        <div className="flex items-center justify-between">
                          <div>
                            <img
                              src={item.data().photoURL}
                              className="rounded-full w-7"
                              alt=""
                            />
                          </div>
                          <div>
                            {item.data().timestamp
                              ? moment(item.data().date.toDate()).fromNow()
                              : 'Loading...'}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h1 className="text-gray-800 px-10 py-2">
                            {' '}
                            {item.data().comment}
                          </h1>
                        </div>
                      </div>

                      <div className="  items-center  ">
                        <div className=" items-center  text-gray-700 text-sm mr-8">
                          <UserCommentSecond
                            keyReferenceOne={keyReference}
                            keyReferenceTwo={item.id}
                            key={item.data().key}
                            item={item.data()}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>{' '}
          </div>{' '}
        </div>
      )}{' '}
    </div>
  );
}

export default UserCardPost;
