import WorkoutProvider from "@/providers/WorkoutProvider";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function ManageWorkoutsLayout() {
  const theme = useTheme();

  return (
    <WorkoutProvider>
    <Stack>
        <Stack.Screen
          name="createWorkout"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
        <Stack.Screen
          name="addExercise"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
        <Stack.Screen
          name="editWorkout"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
    </Stack>
    </WorkoutProvider>
  );
}

export default ManageWorkoutsLayout;
