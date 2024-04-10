import { createContext, useEffect, useState } from "react";
import { User as FirebaseAuthUser, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase-config";



export const FirebaseContext = createContext<{
  user: FirebaseAuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthUser | null>>;
}>({
  user: null,
  setUser: () => {},
});

type Props = { children: React.ReactNode };

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <FirebaseContext.Provider value={{ user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
