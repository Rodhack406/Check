import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert, SafeAreaView,View, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Other = () => {
  const [request, setRequest] = useState('');  // Holds the user's custom request

  // Handle form submission
  const handleSubmit = () => {
    if (!request) {
      Alert.alert('Error', 'Please provide a request');
      return;
    }

    Alert.alert('Request Submitted', `Your request: ${request}`);
  };

  return (

    <View style={{flex:1}}>

            <View style={{padding:12, backgroundColor:"#1974D2",position:"relative"}}>
                        <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between", }}>
                              <Pressable onPress={() => router.push("/requests")}>
                                <AntDesign name="arrowleft" size={24} color="white" />
                             </Pressable>
                             <Text style={styles.title}>Leave Application</Text>
                             
                  
                        </View>           
             </View>

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Other Request</Text>

      <Text style={styles.label}>Describe your request:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your custom request here"
        value={request}
        onChangeText={setRequest}
        multiline={true}
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:-10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color:"white",
    marginRight:100,
      },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#1974D2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
