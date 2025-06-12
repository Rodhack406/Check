import React, { useState } from 'react';
import { 
  StyleSheet, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, 
  View, Pressable, KeyboardAvoidingView, ScrollView, Platform 
} from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Other = () => {
  const [allowanceType, setAllowanceType] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [request, setRequest] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    if (!allowanceType || !claimAmount || !request) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    Alert.alert('Claim Allowance Submitted');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 12, backgroundColor: "#1974D2" }}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
          <Pressable onPress={() => router.push("/requests")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>
            {allowanceType ? `${allowanceType} Claim Allowance` : 'Claim Allowance'}
          </Text>
        </View>
      </View>

      {/* Keyboard Avoiding and Scrollable Form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.container}>
            
            <Text style={styles.label}>Allowance Type:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter type of allowance (e.g., Transportation, Meal)"
              value={allowanceType}
              onChangeText={setAllowanceType}
            />

            <Text style={styles.label}>Claim Amount:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter claim amount"
              value={claimAmount}
              onChangeText={setClaimAmount}
            />

            <Text style={styles.label}>Request Details:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter any additional request details"
              value={request}
              onChangeText={setRequest}
              multiline={true}
              numberOfLines={5}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Claim</Text>
            </TouchableOpacity>

          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensures space for keyboard
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 1
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: "white",
    marginRight: 120,
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
  },
  textArea: {
    height: 130,
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
