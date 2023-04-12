import React, { useContext, useState, useEffect } from "react";

import { auth, db } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  getAuth,
  reauthenticateWithCredential,
  signInWithCredential,
  EmailAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  

    auth.onAuthStateChanged(user => {
        if(user) {
            const data = JSON.parse(window.localStorage.getItem('userData'));
            setUserData(data)
        } else {
            console.log('user logged out')
        }  
    })
    

    const createUser = async (email, password, userInfo) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setDoc(doc(db, "users", user.uid), userInfo);
     
    };

    const logout = () => {
      signOut(auth)
        .then(() => {
       
          setIsLoggedIn(false);
          localStorage.clear();
        })
        .catch((error) => {
         
          alert(error);
        });
    };

  const signIn = async (username, password) => {
    const userName = username;
   
    const q = query(collection(db, "users"), where("userId", "==", userName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      signInWithEmailAndPassword(auth, doc.data().email, password)
        .then((userCredential) => {
          const user = userCredential.user;
  /*           setUser(user);
          setUserData(doc.data());
          setIsLoggedIn(true);
          
          console.log(doc.data());
          window.localStorage.setItem("userData", JSON.stringify(doc.data()));
          */
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert(
              "Incorrect password, please try again"
              
            );
        
          }
        });
    });
  };

  const forgotPassword = async (email, username, secretQ1A, secretQ2A) => {
    const q = query(collection(db, "users"), where("userId", "==", username));
    const querySnapshot = await getDocs(q);
    
  };

  const newPassword = async (email, username, password) => {
    console.log(auth.currentUser);
   
  };

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }
    if (user) {
      console.log(user);
      setUser(user);
      console.log(user);
    }
  };

  const value = {
    createUser,
    user,
    userData,
    isLoggedIn,
    isVerified,
    logout,
    signIn,
    forgotPassword,
    newPassword,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
