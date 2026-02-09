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
  const [initialized, setInitialized] = useState(false);

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
    setUser(null);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
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
        return null;
      }
    }
    return null;
  };

  // Fetch user role from server
  const fetchUserRole = async (email) => {
    try {
      const res = await api.get(`/users/${encodeURIComponent(email)}/role`);
      const data = res.data;
      let r = "Student";
      if (data && data.role) r = data.role;
      setRole(r);
      return r;
    } catch (error) {
      setRole("Student");
      return "Student";
    }
  };

  // Main auth state effect - watches Firebase auth changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await getToken();
        setToken(idToken);
        await fetchUserRole(currentUser.email);
      } else {
        setUser(null);
        setToken(null);
        setRole("Student");
      }

      setLoading(false);
      setInitialized(true);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // Refetch role when user visits (useful for manual role changes in MongoDB)
  useEffect(() => {
    if (user?.email) {
      fetchUserRole(user.email);
    }
  }, [user?.email]);

  const authInfo = {
    user,
    role,
    loading,
    token,
    initialized,
    logOut,
    updateUserProfile,
    registerUser,
    signInUser,
    signInGoogle,
    getToken,
    refetchRole: () => (user?.email ? fetchUserRole(user.email) : null),
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
