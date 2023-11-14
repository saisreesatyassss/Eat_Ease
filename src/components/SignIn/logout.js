import React from "react";
import { auth } from "../SignIn/config"; 

function Logout() {
  const logout = () => {
    auth.signOut().then(() => {
        localStorage.removeItem('user');
        console.log('Logout successful');
        window.location.reload();

        // Redirect or handle the logout success in your application
    }).catch((error) => {
        alert(error.message);
        console.error('Logout error:', error);
    });
}


    return (
        <button onClick={logout} className="bg-red ">Logout</button>
    );
}

export default Logout;
