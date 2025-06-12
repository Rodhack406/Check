import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Stack} from "expo-router"

export default function layout() {
  return (
    <Stack>
        <Stack.Screen name="checkInOut" options={{headerShown: false}}/>
        <Stack.Screen name="welcome" options={{headerShown:false}}/>     
    </Stack>
  )
}

const styles = StyleSheet.create({})