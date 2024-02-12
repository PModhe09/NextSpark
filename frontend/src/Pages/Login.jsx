// Login.jsx
import React, { useContext,useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UserDetailsContext } from '../App';
import firebase from '../firebase/firebase.config'
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const googleProvider = new GoogleAuthProvider();
  const { setUserDetails } = useContext(UserDetailsContext);
  const {userDetails} = useContext(UserDetailsContext)

  const nav=useNavigate();

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
      nav('/jobs-internships')
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
        navigate('/')
        window.location.reload(true) 
      })
      .catch((error) => {
        // An error happened.
      });
      
  };

  const giveDate=(date)=>{
      const dateObj = new Date(date);
      let dateString;
      const monthNumberToName = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      };
      let d=dateObj.getDate();
      let m=monthNumberToName[dateObj.getMonth()];
      let y=dateObj.getFullYear();
      dateString=d+' '+m+' '+y;
      return dateString;
  }

  useEffect(() => {
    console.log('UserDetails updated:', userDetails);
  }, [userDetails]);
  const navigate = useNavigate();
  return (
    
    <div className='block mx-auto justify-center items-center  mt-20  text-primary'>
    {
      console.log(userDetails)
    }

    {
      userDetails?
      <>
      <div className=''>
        <div className='flex justify-center items-center '>
         <img src= {userDetails.photoURL} height={100} width={150} className='rounded-full'/>
        </div>
        <div className='flex justify-center items-center mt-20'>
          <h6 className='text-3xl'>{userDetails.displayName}</h6>
        </div>
        <div className='flex justify-center items-center mt-2'>
          <h6 className='text-md'>Joined on {giveDate(userDetails.metadata.creationTime)}</h6>
        </div>
        <div className='flex justify-center items-center mt-2'>
          <h6 className='text-md'>Email : {userDetails.email}</h6>
        </div>
        <div className='flex justify-center items-center mt-5'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
       onClick={handleSignOut}>
             Sign Out
        </button>
        </div>
        t
        
      </div>
       
</>
      
      :
      <div className='justify-center container mx-auto flex'>
      <div className='text-center p-5 block border-blue-600 bg-spark border-4 w-3/4 rounded-2xl'>
         <h5 className='text-4xl text-white mb-7'>
            Fasten your Job/Internship Search with NextSpark
        </h5>
        <div>
           <button className='bg-spark border-2 hover:bg-red-500 border-blue-600 m-1.5 text-white font-bold py-2 px-4 rounded-lg mx-auto block' onClick={handleSignIn}>
              Sign In with Google
            </button>
         </div>
      </div>
            
      </div>

    }
      

    </div>
  );
};

export default Login;
