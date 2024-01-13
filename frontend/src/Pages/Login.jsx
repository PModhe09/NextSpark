// Login.jsx
import React, { useContext,useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UserDetailsContext } from '../App';


const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const googleProvider = new GoogleAuthProvider();
  const { setUserDetails } = useContext(UserDetailsContext);
  const {userDetails} = useContext(UserDetailsContext)

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log(user, user.displayName);
      setUserDetails(user);

      // Wait for the state to update before logging
      setTimeout(() => {
        console.log(userDetails);
      }, 10000);

      set(ref(db, 'usersInfo/' + user.uid), {
        displayName: user.displayName,
        email: user.email,
        displayPicture: user.photoURL,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('Error-code ', errorCode);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('SignedOut');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    console.log('UserDetails updated:', userDetails);
  }, [userDetails]);

  return (
    <div className='h-screen w-full flex items-center justify-center text-primary'>
      <button className='bg-blue px-8 py-2' onClick={handleSignIn}>
        SignIn
      </button>
      <button className='bg-blue px-8 py-2' onClick={handleSignOut}>
        SignOut
      </button>
    </div>
  );
};

export default Login;
