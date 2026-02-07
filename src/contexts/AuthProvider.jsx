import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { api } from "../services/api";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("Student");

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // fetch role from server when user changes
  useEffect(() => {
    if (!user?.email) return;
    let mounted = true;
    const fetchRole = async () => {
      try {
        const res = await api.get(
          `/users?email=${encodeURIComponent(user.email)}`,
        );
        // assume server returns an array or single object
        const data = res.data;
        let r = "Student";
        if (Array.isArray(data) && data.length > 0) r = data[0].role || r;
        else if (data && data.role) r = data.role;
        if (mounted) setRole(r);
      } catch (_) {
        // default to Student on error
        if (mounted) setRole("Student");
      }
    };
    fetchRole();
    return () => {
      mounted = false;
    };
  }, [user]);

  const authInfo = {
    user,
    role,
    loading,
    logOut,
    updateUserProfile,
    registerUser,
    signInUser,
    signInGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
