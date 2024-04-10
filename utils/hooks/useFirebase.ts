import defaultSchedule from "@/constants/defaultSchedule";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Initialize Firebase Auth
const auth = FIREBASE_AUTH;

const useFirebase = () => {
  const signIn = async (email: string, password: string) => {
    try {
      // Sign in with email and password
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { user: userCredentials.user };
    } catch (error: any) {
      let errorMessage: string;
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Incorrect email or password";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          break;
        default:
          errorMessage = "An error occurred. Please try again later.";
          break;
      }

      return { error: errorMessage };
    }
  };

  const signUp = async (
    fname: string,
    lname: string,
    email: string,
    password: string,
    gender: string,
    dob: string,
    weight: number,
    height: number,
  ) => {
    try {
      // Step 1: Create user with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Step 2: Update user profile with first name and last name
      await updateProfile(userCredentials.user, {
        displayName: fname + " " + lname,
      });

      // Step 3: Initialize user details in Firestore
      const userId = userCredentials.user.uid;
      const userRef = doc(FIREBASE_DB, "users", userId);

      await setDoc(userRef, {
        gender: gender,
        dob: dob,
        weight: weight,
        height: height,
        schedule: defaultSchedule,
        workouts: []
      });

      // If all steps succeed, return the user
      return { user: userCredentials.user };
      
    } catch (error: any) {
      let errorMessage: string;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          break;
        default:
          errorMessage = "An error occurred. Please try again later.";
          break;
      }

      return { error: errorMessage };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Create Google provider
      const provider = new GoogleAuthProvider();

      // Trigger Google sign-in pop-up
      const userCredential = await signInWithPopup(auth, provider);

      console.log(
        "User signed in with Google:",
        userCredential.user.displayName
      );
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return { signIn, signUp, signInWithGoogle, signOut };
};

export default useFirebase;
