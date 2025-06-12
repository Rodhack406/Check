import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { router } from "expo-router"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';

const Requests = () => {
  const [requestType, setRequestType] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRequestSelection = (type) => {
    setRequestType(type);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
        <View style={{ flex: 1 }}>
          
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable onPress={() => router.push("/home")}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </Pressable>
              <Text style={styles.title}>Select a Request Type</Text>
              
              <Pressable onPress={() => setDrawerOpen(!drawerOpen)}>
                <Entypo name="dots-three-vertical" size={19} color="white" />
              </Pressable>
            </View>
            
            {drawerOpen && (
              <View style={styles.drawer}>
                <Pressable style={styles.box} onPress={() => { 
                  setDrawerOpen(false); 
                  router.push("/history"); 
                }}>
                  <FontAwesome5 name="history" size={21} color="grey" style={{ paddingLeft: 10 }} />
                  <Text style={{ marginLeft: 5, color: "grey" }}>History</Text>
                </Pressable>
              </View>
            )}
          </View>

          
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/overtime')}
            >
              <Text style={styles.buttonText}>Overtime</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/leave')}
            >
              <Text style={styles.buttonText}>Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/claimAllawance')}
            >
              <Text style={styles.buttonText}>Claim Allowance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/other')}
            >
              <Text style={styles.buttonText}>Other</Text>
            </TouchableOpacity>

            {requestType ? (
              <Text style={styles.selectedText}>
                You selected: {requestType}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Requests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: "white",
    marginRight: 20,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  header: {
    padding: 12,
    backgroundColor: "#1974D2",
    position: "relative",
  },
  drawer: {
    position: "absolute",
    height: 70,
    width: 130,
    backgroundColor: "white",
    right: 5,
    top: 20,
    zIndex: 10,
  },
  box: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1974D2',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
