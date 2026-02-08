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
  const [token, setToken] = useState(null);

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
    setToken(null);
    setRole("Student");
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Get Firebase token for API requests
  const getToken = async () => {
    if (auth.currentUser) {
      try {
        const idToken = await auth.currentUser.getIdToken();
        return idToken;
      } catch (error) {
        console.error("Error getting token:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Get Firebase token
        const idToken = await getToken();
        setToken(idToken);
      } else {
        setToken(null);
        setRole("Student");
      }

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
          `/users/${encodeURIComponent(user.email)}/role`,
        );
        // assume server returns role
        const data = res.data;
        let r = "Student";
        if (data && data.role) r = data.role;
        if (mounted) setRole(r);
      } catch (error) {
        console.error("Error fetching role:", error);
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
    token,
    logOut,
    updateUserProfile,
    registerUser,
    signInUser,
    signInGoogle,
    getToken,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
