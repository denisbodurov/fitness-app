import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function MotivationLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider

  //Returning a Stack layout with 1 screen - [index]
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default MotivationLayout;
