import React, { useEffect, useState } from 'react';
import { auth, provider } from './config';
import { signInWithPopup } from "firebase/auth";
import Footer from '../Footer';
import { FaUser } from 'react-icons/fa'; // Import the FaUser icon

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
        <div className="text-center">
            {user ? (
                <div>
                    <h2>Welcome, {user.displayName}</h2>
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="User Profile" className="rounded-full w-12 h-12" />
                    ) : (
                        <div>
                            <p>No profile picture available</p>
                            <FaUser size={24} className="rounded-full w-12 h-12" />
                        </div>
                    )}
                    {/* Add any other user details you want to display */}
                </div>
            ) : (
                <div>
                    <p>No user logged in</p>
                    <button onClick={signIn} className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer">Sign In</button>
                </div>
            )} 
        </div>
    );
}

export default SignIn;
