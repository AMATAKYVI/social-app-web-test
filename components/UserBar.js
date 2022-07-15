import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PostScreen from './PostScreen';
import UserCardPost from './UserCardPost';
import { v4 as uuidv4 } from 'uuid';

function UserBar() {
  const [user, userLoading, userError] = useAuthState(auth);
  const [hidePostBar, setHidePostBar] = useState(true);
  const [data, setData] = useState('');
  const postRef = collection(db, 'post');
  const q = query(postRef, orderBy('date', 'desc'));
  const [posts, postLoading, postError, postSnapshot] = useCollectionData(q);

  const handlePost = async () => {
    if (data.length < 0) {
      return;
    }
    const docRef = await addDoc(collection(db, 'post'), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      post: data,
      key: uuidv4(),
      date: new Date(),
      timestamp: serverTimestamp(),
    });
    setData('');
  };
  return (
    <div className=" transition-all duration-300">
      <div className="flex items-center gap-4 p-4 bg-white/10">
        <img
          className="w-10 h-10 rounded-full"
          src={`${
            user
              ? user.photoURL
              : 'https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/285255377_1204808793624692_4785319802991534609_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RtDxBRJBrFgAX9EZFsl&_nc_ht=scontent-iad3-2.xx&oh=00_AT-lhmMR-HrrgkGMEw1q_CBY3LuBLCtBbtr-EuaxNQswVw&oe=62D690BB'
          }`}
          alt="Rounded avatar"
        />
        <div className="flex items-center gap-2">
          {hidePostBar ? (
            <div
              className="transition-all duration-300"
              onClick={() => setHidePostBar(false)}
            >
              Say something?
            </div>
          ) : (
            <input
              type="text"
              name=""
              id=""
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Say something..."
              className="py-2 text-black outline-none tracking-wide px-5 rounded-lg bg-gray-200 transition-all duration-300"
            />
          )}

          <div
            className="bg-blue-600 px-5 py-2 rounded-lg"
            onClick={() => {
              handlePost();
              setHidePostBar(true);
            }}
          >
            <button>Post</button>
          </div>
        </div>
      </div>
      <div>
        <PostScreen>
          {posts?.map((item) => {
            return (
              <UserCardPost
                key={item.post}
                item={item}
                loading={postLoading}
                error={postError}
              />
            );
          })}
        </PostScreen>
      </div>
    </div>
  );
}

export default UserBar;
