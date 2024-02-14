import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PaperProvider } from 'react-native-paper';
import { LightTheme } from '@/themes/LightTheme';
import { DarkTheme } from '@/themes/DarkTheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ProtestStrike: require('@/assets/fonts/ProtestStrike-Regular.ttf'),
    LatoRegular: require('@/assets/fonts/Lato-Regular.ttf'),
    LatoBlack: require('@/assets/fonts/Lato-Black.ttf'),
    LatoBlackItalic: require('@/assets/fonts/Lato-BlackItalic.ttf'),
    LatoBold: require('@/assets/fonts/Lato-Bold.ttf'),
    LatoBoldItalic: require('@/assets/fonts/Lato-BoldItalic.ttf'),
    LatoItalic: require('@/assets/fonts/Lato-Italic.ttf'),
    LatoLight: require('@/assets/fonts/Lato-Light.ttf'),
    LatoLightItalic: require('@/assets/fonts/Lato-LightItalic.ttf'),
    LatoThin: require('@/assets/fonts/Lato-Thin.ttf'),
    LatoThinItalic: require('@/assets/fonts/Lato-ThinItalic.ttf'),

  
    ...FontAwesome.font,
  });


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={(colorScheme === "dark") ? DarkTheme : LightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  );
}
