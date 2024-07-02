import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaDiscord } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar flex items-center justify-center sm:justify-start">
      <div className="flex items-center"> {/* Container for logo and text */}
        <FaDiscord className="text-4xl mr-2" /> {/* Discord icon */}
        <h1 className="text-white text-3xl font-bold">Discord</h1> {/* Logo text */}
      </div>

      {user ? (
        <button onClick={signOut} className="sign-out ml-auto text-xl" type="button">
 <FaSignInAlt className="mr-2" />
        </button>
      ) : (
        ""
      )}
    </nav>
  );
};

export default NavBar;
