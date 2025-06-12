import { StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  const router = useRouter(); // useRouter to get the router object
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    console.log('Router query:', router.query); // Check the full router query object
    if (router.query?.status) {
      const currentTime = new Date().toLocaleString(); // Get current time
      setStatus(router.query.status); // Set status
      setTime(currentTime); // Set the time of check-in/out
    }
  }, [router.query]); // Re-run this effect when the query changes

  const message = React.useMemo(() => {
    if (status === 'checked-in') {
      return `You have successfully checked in at ${time}`;
    } else if (status === 'checked-out') {
      return `You have successfully checked out at ${time}`;
    } else {
      return 'Welcome!';
    }
  }, [status, time]); // Ensure memoization for efficient rendering

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1974D2" />
      <Text style={styles.welcomeText}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/checkInOut')}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1974D2',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1974D2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
