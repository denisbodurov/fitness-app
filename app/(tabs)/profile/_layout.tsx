import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function ProfileLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider

  //Returning a Stack layout with 2 screens - [index, settings]
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default ProfileLayout;
