import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Leave = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    setStartDateText(currentDate.toLocaleDateString());
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    setEndDateText(currentDate.toLocaleDateString());
  };

  const handleSubmit = () => {
    if (!leaveType || !startDateText || !endDateText || !reason) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Check that start date is strictly before end date
    if (startDate.getTime() >= endDate.getTime()) {
      Alert.alert('Error', 'Start date must be before end date.');
      return;
    }

    Alert.alert(
      'Leave Application Submitted',
      `Leave Type: ${leaveType}\nStart Date: ${startDateText}\nEnd Date: ${endDateText}\nReason: ${reason}`
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={{ padding: 12, backgroundColor: "#1974D2", position: "relative" }}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
          <Pressable onPress={() => router.push("/requests")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>Leave Application</Text>
        </View>
      </View>

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
        >
          <ScrollView contentContainerStyle={styles.formContent}>
            <Text style={styles.label}>Leave Type:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter leave type (e.g., Sick Leave, Vacation)"
              value={leaveType}
              onChangeText={setLeaveType}
            />

            <Text style={styles.label}>Start Date:</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
              <Text style={{ fontSize: 16, color: startDateText ? '#000' : '#999' }}>
                {startDateText || 'Select start date'}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
              />
            )}

            <Text style={styles.label}>End Date:</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
              <Text style={{ fontSize: 16, color: endDateText ? '#000' : '#999' }}>
                {endDateText || 'Select end date'}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
              />
            )}

            <Text style={styles.label}>Reason for Leave:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter reason for leave"
              value={reason}
              onChangeText={setReason}
              multiline={true}
              numberOfLines={6}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Leave Request</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Leave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContent: {
    padding: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: "white",
    marginRight: 100,
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
