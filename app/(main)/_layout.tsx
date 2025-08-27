import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TabLayout() {
  // useEffect(() => {
  //   const unlockScreenOerientation = async () => {
  //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   };
  //   unlockScreenOerientation();
  // }, []);

  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: 'absolute',
    //       },
    //       default: {},
    //     }),
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({}) => <IconSymbol size={28} name="house.fill" color={'black'} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({}) => <IconSymbol size={28} name="paperplane.fill" color={'black'} />,
    //     }}
    //   />
    // </Tabs>

    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="(main)" options={{ headerShown: false }} /> 
        <Stack.Screen name="+not-found" />  */}
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
