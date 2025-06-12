import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      
      <Stack.Screen name="MessageScreen" options={{ headerShown: false }} />      
      <Stack.Screen name="notification" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
