// import React, { useEffect, useState } from 'react';
// import { auth, provider } from './config';
// import { signInWithPopup } from "firebase/auth";
// import Footer from '../Footer';
// import { FaUser } from 'react-icons/fa'; // Import the FaUser icon

// function SignIn() {
//     const [user, setUser] = useState(null);

//     const signIn = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const user = result.user;
//                 setUser(user);
//                 localStorage.setItem('user', JSON.stringify(user));
//                 console.log('SignUp successful', user);
//             })
//             .catch((error) => {
//                 alert(error.message);
//             });
//     };

//     // useEffect to set value from local storage on mount
//     useEffect(() => {
//         const localUser = localStorage.getItem('user');
//         if (localUser) {
//             setUser(JSON.parse(localUser));
//         }
//     }, []);

//     return (
//         <div className="text-center">
//             {user ? (
//                 <div>
//                     <h2>Welcome, {user.displayName}</h2>
//                     {user.photoURL ? (
//                         <img src={user.photoURL} alt="User Profile" className="rounded-full w-12 h-12" />
//                     ) : (
//                         <div>
//                             <p>No profile picture available</p>
//                             <FaUser size={24} className="rounded-full w-12 h-12" />
//                         </div>
//                     )}
//                     {/* Add any other user details you want to display */}
//                 </div>
//             ) : (
//                 <div>
//                     <p>No user logged in</p>
//                     <button onClick={signIn} className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer">Sign In</button>
//                 </div>
//             )} 
//         </div>
//     );
// }

// export default SignIn;
import React, { useEffect, useState } from 'react';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import Footer from '../Footer';
import { FaUser } from 'react-icons/fa'; // Import the FaUser icon 
import Logout from './logout';

function SignIn() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('SignUp successful', user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // useEffect to set value from local storage on mount
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {user ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user.displayName}</h2>
          <div className="flex items-center justify-center mb-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="User Profile" className="rounded-full w-12 h-12" />
            ) : (
              <div>
                <p className="mb-1">No profile picture available</p>
                <FaUser size={24} className="rounded-full w-12 h-12" />
              </div>
            )}
          </div>
          <div className="text-left">
            <p>Email: {user.email}</p>
            {/* <p>UID: {user.uid}</p> */}
            {/* Add any other user details you want to display */}
          </div>
          <button
       className="p-3 bg-red-500 rounded-full text-white text-center cursor-pointer hover:bg-red-600 mt-4"
    >
          <Logout /> {/* Include the Logout component */}
    </button>
         </div>
      ) : (
        <div>
          <p className="text-lg mb-4">No user logged in</p>
          <button
            onClick={signIn}
            className="p-3 bg-blue-500 rounded-full text-white text-center cursor-pointer hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;