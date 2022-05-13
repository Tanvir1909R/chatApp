import React from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from 'firebase/auth'
import { updateDoc , doc } from 'firebase/firestore'

function NavBar() {
  const hendlesignOut = async ()=>{
    await updateDoc(doc(db, 'users', auth.currentUser.uid),{
      isOnline:false,
    })
    await signOut(auth)
  }
  return (
    <nav>
      <h3>
        <Link to="/">Massenger</Link>
      </h3>
      <div>
        {auth.currentUser ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={hendlesignOut}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
