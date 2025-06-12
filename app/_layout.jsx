import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { DrawerProvider } from './DrawerContext'; 

export default function _layout() {
  return (
    <DrawerProvider> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(check)" options={{ headerShown: false }} />
        <Stack.Screen name="(log)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(drop)" options={{ headerShown: false }} /> 
      </Stack>
    </DrawerProvider>
  );
} 

const styles = StyleSheet.create({}); 
