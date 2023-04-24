import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence,initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDJ5JaK1oKK26iCPYofS-A_uGPeXQcU5iE",
  authDomain: "nc-1capstone.firebaseapp.com",
  projectId: "nc-1capstone",
  storageBucket: "nc-1capstone.appspot.com",
  messagingSenderId: "604810813514",
  appId: "1:604810813514:web:47cf0a2955c8b129b486b3",
  measurementId: "G-6WDCNEY6EL"
}

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
});
export const db = getFirestore(app);