import { FirebaseContext } from "@/providers/FirebaseProvider";
import { Redirect } from "expo-router";
import { useContext } from "react";

export default function Index() {
  const { user }  = useContext(FirebaseContext);

  return user ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}
