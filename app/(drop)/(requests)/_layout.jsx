import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="claimAllawance" options={{ headerShown: false }} />
      <Stack.Screen name="leave" options={{ headerShown: false }} />
      <Stack.Screen name="other" options={{ headerShown: false }} />
      <Stack.Screen name="overtime" options={{ headerShown: false }}/>
      <Stack.Screen name="requests" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />
    </Stack>
  );
}
