import { StackActions, useNavigation } from "@react-navigation/native";
import { Stack, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useTheme } from "react-native-paper";

function FeedLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background},
        }}
      />
      <Stack.Screen
        name="edit-schedule"
        
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default FeedLayout;
