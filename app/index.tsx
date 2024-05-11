import { FirebaseContext } from "@/providers/FirebaseProvider";
import { Redirect } from "expo-router";
import { useContext } from "react";

function Index() {
  const { user }  = useContext(FirebaseContext); // Getting the user object from the Firebase provider

  // If the user is authenticated (user is not null) then we redirect to [home].
  // If the user is not authenticated (user is null) then we redirect to [sign-in].
  return user ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}

export default Index;