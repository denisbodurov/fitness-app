import { StackActions } from "@react-navigation/native";
import { Stack, router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { useTheme } from "react-native-paper";

function ProfileLayout() {
  const theme = useTheme();
  const navigation = useNavigation()
  const state = navigation.getState();
  const currentRouteName = state?.routes?.[state?.index]?.name;

  console.log("Route before focus: " + currentRouteName)

  useFocusEffect(
    useCallback(() => {
      return () => {
        const state = navigation.getState();
        if (state?.routes?.length > 4) {
          navigation.dispatch(StackActions.pop(1));
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
