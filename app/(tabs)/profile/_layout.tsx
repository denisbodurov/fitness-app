import { StackActions } from "@react-navigation/native";
import { Stack, router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { useTheme } from "react-native-paper";

function ProfileLayout() {
  const theme = useTheme();
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      return () => {
        const state = navigation.getState();
        if (state?.routes?.length >= 3) {
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
