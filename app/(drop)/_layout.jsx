import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="theme" options={{ headerShown: false }} />
      <Stack.Screen name="(requests)" options={{ headerShown: false }} />
      <Stack.Screen name="(notification)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
