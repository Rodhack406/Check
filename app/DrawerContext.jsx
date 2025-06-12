import React, { createContext, useContext, useState, useRef } from 'react';
import { Animated } from 'react-native';

// Create a context
const DrawerContext = createContext();

// Drawer provider component
export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerHeight = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(drawerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDrawerOpen(false));
    } else {
      setIsDrawerOpen(true);
      Animated.timing(drawerHeight, {
        toValue: 300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeDrawer = () => {
    Animated.timing(drawerHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsDrawerOpen(false));
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, closeDrawer, drawerHeight }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Custom hook to use the drawer context
export const useDrawer = () => useContext(DrawerContext);
