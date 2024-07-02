import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaSignInAlt } from "react-icons/fa";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="relative h-screen flex items-center justify-center lg:justify-start welcome">
      <div className="absolute inset-0 bg-opacity-10"></div>
      <div className="absolute inset-0 backdrop-blur-sm lg:backdrop-blur-none"></div>
      <div className="relative z-10 flex flex-col lg:flex-row lg:mx-20">
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl">
            GROUP CHAT THAT’S ALL FUN & GAMES
          </h2>
          <p className="text-xl font-sans mt-4">
            Discord is great for playing games and chilling with friends, or even building a worldwide community.
            Customise your own space to talk, play, and hang out.
          </p>
          <div className="flex justify-center lg:justify-start mt-4">
            <button
              className="mt-4 bg-white rounded-lg px-4 py-2 text-black shadow-md uppercase flex items-center"
              onClick={googleSignIn}
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-2/3">
          {/* Right column for additional content or leave empty */}
        </div>
      </div>
    </main>
  );
};

export default Welcome;
