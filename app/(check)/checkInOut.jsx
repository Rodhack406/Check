import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location'; 
import { SafeAreaView } from 'react-native-safe-area-context';

// Coordinates for IHS Head Office in Lusaka
const HEAD_OFFICE_COORDS = {
  latitude: -15.416287,
  longitude: 28.284548,
};

const { width, height } = Dimensions.get('window');

// Geofence radius in meters
const GEOFENCE_RADIUS = 100;

const checkInOut = () => {
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: HEAD_OFFICE_COORDS.latitude,
    longitude: HEAD_OFFICE_COORDS.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [userLocation, setUserLocation] = useState(null);

  const handleCheckIn = () => {
    if (isWithinGeofence()) {
      setLoading(true);
      const checkInTime = new Date().toISOString();
      setTimeout(() => {
        setLoading(false);
       // router.push('/welcome?.status=checked-in'); 
        router.push(`/dashboard?status=checked-in&time=${checkInTime}`);
      }, 2000);
    } else {
      Alert.alert('Error', 'You must be at the IHS Head Office to check in.');
    }
  };
  

  const handleCheckOut = () => {
    if (isWithinGeofence()) {
      setLoading(true);
      const checkOutTime = new Date().toISOString();
      setTimeout(() => {
        setLoading(false);
        //router.push('/welcome?status=checked-out');
        router.push(`/dashboard?status=checked-out&time=${checkOutTime}`);
      }, 2000);
    } else {
      Alert.alert('Error', 'You must be at the IHS Head Office to check out.');
    }
  };

  const showUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch your location. Please try again.');
      console.error('Location error:', error);
    }
  };

  const isWithinGeofence = () => {
    if (!userLocation) return false;
    const distance = getDistanceFromLatLonInMeters(
      userLocation.latitude,
      userLocation.longitude,
      HEAD_OFFICE_COORDS.latitude,
      HEAD_OFFICE_COORDS.longitude
    );
    return distance <= GEOFENCE_RADIUS;
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  useEffect(() => {
    showUserLocation();
  }, []); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/home")}>
          <AntDesign style={styles.backButton} name="arrowleft" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Check In and Check Out</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Make sure you are at the IHS Head Office before checking in or out.
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Your Current Location" />
          )}
          <Marker
            coordinate={HEAD_OFFICE_COORDS}
            title="IHS Head Office"
            description="IHS Zambia Head Office"
            pinColor="blue"
          />
          <Circle
            center={HEAD_OFFICE_COORDS}
            radius={GEOFENCE_RADIUS}
            strokeColor="rgba(0,112,255,0.5)"
            fillColor="rgba(0,112,255,0.2)"
          />
        </MapView>
        <Pressable style={styles.showLocationButton} onPress={showUserLocation}>
          <FontAwesome6 name="location-crosshairs" size={30} color="gray" />
        </Pressable>
      </View>

      <Text style={styles.coordinatesText}>
        Latitude: {userLocation?.latitude}S, Longitude: {userLocation?.longitude}E
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.checkInButton]} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.checkOutButton]} onPress={handleCheckOut}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1974D2" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default checkInOut;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     backgroundColor: '#fdfffd' 
    },

  header: { 
    paddingVertical: 12,
    backgroundColor: "#1974D2",
    flexDirection: 'row',
    alignItems: 'center' },

  backButton: {
     paddingLeft: 12 },

  headerText: { 
    flex: 1,
     textAlign: 'center', 
     fontWeight: '600', 
     fontSize: 18,
      color: 'white' },

  infoContainer: {
     margin: 15,
     marginTop: 20 },
  infoText: { 
    color: "black",
    fontSize: 16 },

  mapContainer: {
     margin: 10,
     marginTop: 20, 
     height: height * 0.4,
     borderRadius: 10,
     overflow: 'hidden' },

  map: { 
    flex: 1 },

  showLocationButton: { 
    position: 'absolute', 
    bottom: 20, 
    right: 10, 
    padding: 10, 
    backgroundColor: 'white', 
    borderRadius: 20 },

  coordinatesText: {
    textAlign: 'center', 
    color: 'black',
    marginVertical: 10 },

  buttonContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    
  
  },

  button: { width: '40%',
     paddingVertical: 10,
      borderRadius: 10, 
      justifyContent: 'center',
       alignItems: 'center' },

  checkInButton: { 
    backgroundColor: '#1974D2' },

  checkOutButton: {
     backgroundColor: '#1974D2' },

  buttonText: { 
    color: 'white',
     fontSize: 16, 
     fontWeight: '400' },

  loadingContainer: { 
    position: 'absolute',
     top: '85%', 
     left: '60%',
     transform: [{ translateX: -50 },
      { translateY: -50 }] },
});
