
import React from "react"; 
import logout from "../components/SignIn/logout";
import SignIn from "../components/SignIn/signin";

function Profile() {
       
    return (
        
        <div>
        {/* <h1 className="text-3xl font-bold h-screen underline">Profile page</h1>   */}
        <SignIn/>
        <button onClick={logout}></button> 
        </div>
    );
    }


 

export default Profile;