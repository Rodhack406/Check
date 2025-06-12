import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert,View, SafeAreaView, Pressable,KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Overtime = () => {
  const [reason, setReason] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  // Function to handle date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setDateText(currentDate.toLocaleDateString()); // Format the date as a string
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!reason || !hours || !dateText) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    Alert.alert('Overtime Request Submitted', `Reason: ${reason}\nHours: ${hours}\nDate: ${dateText}`);
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
   <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              style={{ flex: 1 }}
            >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>Overtime Request</Text>

      <Text style={styles.label}>Reason for Overtime:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter reason for overtime"
        value={reason}
        onChangeText={setReason}
        multiline={true}
        numberOfLines={6}
      />

      <Text style={styles.label}>Number of Hours:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of hours"
        value={hours}
        onChangeText={setHours}
      />

      <Text style={styles.label}>Date for Overtime:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ fontSize: 16, color: dateText ? '#000' : '#999' }}>
          {dateText || 'Select date'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  </KeyboardAvoidingView>
    </View>
  );
};

export default Overtime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:-20,
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensures space for keyboard
  }
});
