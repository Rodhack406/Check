import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

const Log = () => {
  const router = useRouter();
  const [dots, setDots] = useState(''); // State for the animated dots

  const logo = {
    uri: 'https://png.pngtree.com/png-clipart/20230317/original/pngtree-location-check-vector-icon-design-illustration-png-image_8991556.png' ///'https://th.bing.com/th/id/OIP.JDeixiBOlynnS0AeYpOltwAAAA?rs=1&pid=ImgDetMain',
  };

  useEffect(() => {
    // Update the animated dots
    const dotTimer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500); // Update every 500ms

    // Redirect to the home page after 9 seconds
    const redirectTimer = setTimeout(() => {
      clearInterval(dotTimer); // Clear the interval when redirecting
     router.push('/home'); // Uncomment this when navigation is ready
    }, 7000);

    // Cleanup timers
    return () => {
      clearInterval(dotTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1974D2" />
      <View
        style={{
          height: 230,
          width: 240,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.text}>
        Getting ready
        <Text style={styles.dots}>{dots}</Text>
      </Text>
    </View>
  );
};

export default Log;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Background color
  },
  logo: {
    width: 205, // Adjust width
    height: 190, // Adjust height
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'darkblue',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  dots: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'darkbold',
  },
});
