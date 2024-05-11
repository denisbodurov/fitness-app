import { createContext, useEffect, useState } from "react";
import { User as FirebaseAuthUser, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase-config";

// Creates a React context for sharing Firebase user information
export const FirebaseContext = createContext<{
  user: FirebaseAuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthUser | null>>;
}>({
  user: null,
  setUser: () => {},
});

type Props = { children: React.ReactNode };

// FirebaseProvider component to manage user state based on Firebase Auth
export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  const [initializing, setInitializing] = useState(true); // Flag to track initialization state
  const [user, setUser] = useState<FirebaseAuthUser | null>(null); // Stores the current user

  // useEffect hook to listen for auth state changes with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user); // Update user state based on Auth state change
      if (initializing) setInitializing(false); // Mark initialization complete after first update
    });

    // Cleanup function to unsubscribe from auth state changes on component unmount
    return unsubscribe;
  }, []);

  // Render nothing while initializing to avoid rendering issues
  if (initializing) return null;

  // Provide user and setUser function to child components through context
  return (
    <FirebaseContext.Provider value={{ user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};