import WorkoutProvider from "@/providers/WorkoutProvider";
import { StackActions } from "@react-navigation/native";
import { Stack, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { useTheme } from "react-native-paper";

function WorkoutsLayout() {
  const theme = useTheme();
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      return () => {
        const state = navigation.getState();
        if (state?.routes?.length > 4) {
          navigation.dispatch(StackActions.popToTop());
        } else {
          console.log("Stack is already at the top");
        }
      };
    }, [navigation])
  );

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
        name="(manage_workouts)"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default WorkoutsLayout;
