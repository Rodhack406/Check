import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useDrawer} from '../DrawerContext';


export default function RootLayout() {

  const { closeDrawer } = useDrawer();

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  closeDrawer();
                  props.onPress();
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="help"
          options={{
            title: 'Help',
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="help" size={24} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  closeDrawer();
                  props.onPress();
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            headerShown: false,
            tabBarIcon: ({ color }) => <SimpleLineIcons name="event" size={24} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  closeDrawer();
                  props.onPress();
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: 'Schedule',
            headerShown: false,
            tabBarIcon: ({ color }) => <MaterialIcons name="schedule" size={24} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  closeDrawer();
                  props.onPress();
                }}
              />
            ),
          }}
        />
      </Tabs>
      </>
  );
}
