import { StackActions } from "@react-navigation/native";
import { Stack, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { useTheme } from "react-native-paper";

function FeedLayout() {
  const theme = useTheme();
  // const navigation = useNavigation()

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       navigation.dispatch(StackActions.popToTop());
  //     };
  //   }, [navigation])
  // );

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
        name="editSchedule"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}

export default FeedLayout;
