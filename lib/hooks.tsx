import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";

export const useAuthProvider = () => {
  const googleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        console.log("user signed in successfully with Google");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return { googleSignIn, signOut };
};
