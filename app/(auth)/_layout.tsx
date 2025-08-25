import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [isLoggedIn] = useState(false);

  useEffect(() => {
    const unlockScreenOerientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
    unlockScreenOerientation();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack
        screenOptions={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      >
        {/* {isLoggedIn ?<Stack.Screen name="(main)"/>:<Stack.Screen name="(auth)" />} */}
        {/* <Stack.Screen name="(main)" options={{ headerShown: false }} /> 
        <Stack.Screen name="+not-found" />  */}
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
