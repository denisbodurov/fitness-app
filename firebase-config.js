import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC3FbeVRVAYmEDoqfjNi9B2KXML1vfyUKM",
  authDomain: "fitness-app-19411.firebaseapp.com",
  projectId: "fitness-app-19411",
  storageBucket: "fitness-app-19411.appspot.com",
  messagingSenderId: "378514120955",
  appId: "1:378514120955:web:6e3ec29c92798bcdbf905e",
  measurementId: "G-2R8710DYN4",
};

export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_DB = getFirestore(FIREBASE_APP);