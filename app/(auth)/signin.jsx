import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, StatusBar, TouchableOpacity } from 'react-native';

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (name) => {
    // Validate field when it loses focus
    if (!formData[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = () => {
    // Basic validation on submit
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      // Implement your login logic here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1974D2" />
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>Welcome back to Nursing and Midwifery Council of Zambia..!!</Text>
        </View>

        <View>
          <TextInput
            placeholder="Username"
            placeholderTextColor="black"
            style={[styles.input, errors.username && styles.errorInput]}
            onChangeText={(value) => handleChange('username', value)}
            onBlur={() => handleBlur('username')}
            value={formData.username}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            style={[styles.input, errors.password && styles.errorInput]}
            onChangeText={(value) => handleChange('password', value)}
            onBlur={() => handleBlur('password')}
            value={formData.password}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Text style={styles.forgotPassword}>Forgot your password?</Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    padding: 50,
    marginTop: 70,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: 'blue',
    fontWeight: '500',
  },
  subtitle: {
    color: 'black',
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '400',
    maxWidth: '90%',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  forgotPassword: {
    color: 'blue',
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
