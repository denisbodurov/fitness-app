import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function HomeLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider

  //Returning a Stack layout with 3 screens - [index, edit-schedule, default-workouts/[id]]
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
        name="edit-schedule"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="default-workouts/[id]"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default HomeLayout;
