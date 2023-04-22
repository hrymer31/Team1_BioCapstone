import React, { useContext, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  

    auth.onAuthStateChanged(user => {
        if(user) {
          console.log(user.auth.currentUser)
          setUser(user.auth.currentUser)
            /* const data = JSON.parse(window.localStorage.getItem('userData'));
            setUserData(data) */
        } else {
            console.log('user logged out')
        }  
    })
    console.log(user)

    const createUser = async (email, password, userInfo) => {
      const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          console.log(userInfo)
          const patientInfo = {
            uid: user.uid,
            accessCode: userInfo.accessCode,
            name: userInfo.Name,
            email: userInfo.email
          }
          console.log(patientInfo)
          fetch("api/patients/add", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(patientInfo)
          }).then((response) => {
            alert(response.statusText)
          })
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
    const email = username;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          //const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert(
              "Incorrect password, please try again"
              
            );
        
          }
        });
  };

  const forgotPassword = async (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('password reset link sent')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
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
