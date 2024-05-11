import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function WorkoutsLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider

  //Returning a Stack layout with 4 screens - [index, [id], create-workout, edit-workout/[id]]
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
        name="[id]"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="create-workout"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="edit-workout/[id]"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default WorkoutsLayout;
