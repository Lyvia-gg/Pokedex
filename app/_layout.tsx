import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
// import store from '@/redux/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/redux/store/store';
// import * as ScreenOrientation from 'expo-screen-orientation';
import { useContext, useEffect } from 'react';
import { SessionProvider, useSession } from '@/context/AuthContext';
import SplashScreenController from '@/app/splash';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Root() {
  return (
    <SessionProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <SplashScreenController />
        <RootNavigator />
      </SafeAreaView>
    </SessionProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const { session } = useSession();

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
