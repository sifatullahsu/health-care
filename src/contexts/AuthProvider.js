import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { createUser, getUserByUid } from '../queries/users';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserCreating, setIsUserCreating] = useState(false);
  const [refetch, setRefetch] = useState(false); // Only When User Data Updating

  // console.log(user);
  // console.log(doctor);

  const googleProvider = new GoogleAuthProvider();

  const signUp = async (data) => {
    setLoading(true);
    setIsUserCreating(true);

    try {
      const firebase = await createUserWithEmailAndPassword(auth, data?.email, data?.password);

      if (firebase?.user) {

        const finalData = {
          name: data.name,
          email: data.email,
          role: 'subscriber',
          uid: firebase?.user?.uid
        }

        return createUser(finalData);
      }
    }
    catch (error) {
      return {
        status: false,
        message: error.message
      };
    }
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const changePassword = (password) => {
    return updatePassword(auth.currentUser, password);
  }

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const userSocialLogin = (provider) => {
    setLoading(true);
    if (provider === 'google') {
      return signInWithPopup(auth, googleProvider);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!isUserCreating) {
        try {
          setLoading(true);
          getUserByUid(currentUser.uid).then(result => {

            if (result?.status) {
              if (!result.data.hasOwnProperty('doctor')) {
                setUser(result.data);
              }
              else {
                setDoctor(result.data.doctor);
                delete result.data.doctor;
                setUser(result.data);
              }

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
      }
    });

    return () => unsubscribe();
  }, [isUserCreating, refetch])

  const authInfo = {
    signUp,
    signIn,
    updateUser,
    logOut,
    changePassword,
    forgetPassword,
    user,
    doctor,
    loading, setLoading,
    isUserCreating, setIsUserCreating,
    refetch, setRefetch,
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