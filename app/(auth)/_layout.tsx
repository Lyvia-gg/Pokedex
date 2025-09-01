import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const [isLoggedIn] = useState(false);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}
