import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function AuthLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider

  //Returning a Stack layout with 2 screens - [sign-in, sign-up]
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default AuthLayout;
