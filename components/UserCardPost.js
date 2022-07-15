import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import moment from 'moment';
import { collection, orderBy, query } from 'firebase/firestore';
import UserComment from './UserComment';
import { useCollectionData } from 'react-firebase-hooks/firestore';
function UserCardPost({ item, loading, error, postSnapshot, keyReference }) {
  const [expanded, setExpanded] = useState(false);
  const postRef = collection(db, 'post', keyReference, 'comment');
  const q = query(postRef, orderBy('date', 'desc'));
  const [comment, commentLoading, commentError, commentSnapshot] =
    useCollectionData(q);
  console.log(comment);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {}, []);
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
                  {item.timestamp
                    ? moment(item.date.toDate()).fromNow()
                    : 'Loading...'}
                </small>
              </div>
              <p className="text-gray-700 text-xs ">
                {item.timestamp
                  ? item.date.toDate().toLocaleString()
                  : 'Loading...'}
              </p>
              <p className="mt-3 text-gray-700 text-sm">{item.post}</p>
              <div className="mt-4 flex items-center">
                <div className="flex  text-gray-700 text-sm mr-3">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>0</span>
                </div>
                <div className="flex items-center  text-gray-700 text-sm mr-8">
                  <UserComment
                    item={item}
                    postSnapshot={postSnapshot}
                    keyReference={keyReference}
                  />
                  <span>{comment?.length}</span>
                </div>
                <div className="flex  text-gray-700 text-sm mr-4">
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
                </div>
              </div>{' '}
              <div className="text-black text-xs mt-2">
                {comment?.map((item) => {
                  return (
                    <div
                      className=" bg-white p-3 mb-1 rounded-lg"
                      key={item.key}
                    >
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
                        <h1 className="text-gray-800"> {item.comment}</h1>
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
