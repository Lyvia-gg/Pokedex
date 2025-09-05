import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider, shallowEqual, useSelector } from 'react-redux';
import { store } from '@/redux/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUser, PokemonState } from '@/redux/store/type';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Root() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#7b7776' }}>
          <RootNavigator />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootNavigator() {
  const session: IUser | null = useSelector((state: PokemonState) => state.user, shallowEqual);

  const [loaded] = useFonts({
    retroGaming: require('../assets/fonts/Retro-gaming.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
