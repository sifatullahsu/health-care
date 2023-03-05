import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { getUser } from '../queries/users';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(user);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const userSocialLogin = (provider) => {
    if (provider === 'google') {
      return signInWithPopup(auth, googleProvider);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {

      try {
        setLoading(true);
        getUser(currentUser.uid)
          .then(result => {
            if (result?.status) {
              // setUser({ uid: currentUser.uid, email: currentUser.email, data: result.data });
              setUser(result.data);
              setLoading(false);
            }
            else {
              setUser(null);
              setLoading(false);
            }
          })
      }
      catch (error) {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [])

  const authInfo = {
    createUser,
    signIn,
    updateUser,
    logOut,
    user,
    loading, setLoading,
    userSocialLogin
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;