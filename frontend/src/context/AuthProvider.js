import React from 'react';
import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = React.createContext(); 

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  const authInfo = {
    user,
    createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    LogInWithGoogle: () => signInWithPopup(auth, googleProvider),
    Login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    LogOut: () => signOut(auth),
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
