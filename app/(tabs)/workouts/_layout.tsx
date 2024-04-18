import { StackActions } from "@react-navigation/native";
import { Stack, useFocusEffect, useNavigation, useSegments } from "expo-router";
import { useCallback } from "react";
import { useTheme } from "react-native-paper";

function WorkoutsLayout() {
  const theme = useTheme();

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
        name="edit-workout"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default WorkoutsLayout;
