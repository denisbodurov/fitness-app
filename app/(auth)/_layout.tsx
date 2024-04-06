import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

function FeedLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
    
  );
}

export default FeedLayout;
