import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

const MessageScreen = () => {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([
    // For the initial message, we add a timestamp.
    { 
      id: 1, 
      text: params.message || 'No message available', 
      sender: 'other', 
      timestamp: new Date().toISOString() 
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  // Helper function to format the timestamp.
  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const now = new Date();
    if (
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear()
    ) {
      // If the message is from today, display the time.
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Otherwise, display the date.
      return dateObj.toLocaleDateString();
    }
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = { 
        id: messages.length + 1, 
        text: inputText, 
        sender: 'me',
        timestamp: new Date().toISOString(), // Set the current timestamp
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Scroll to the last message
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
    >
     
        <View style={{ flex: 1 }}>
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <Image 
              source={{ uri: params.profilePic || 'https://via.placeholder.com/50' }} 
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.userName}>{params.name || 'Unknown User'}</Text>
              <Text style={styles.activeStatus}>Active now</Text>
            </View>
          </View>

          {/* Chat Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={item.sender === 'me' ? styles.senderMessage : styles.receiverMessage}>
                <Text style={[styles.messageText, { color: item.sender === 'me' ? 'white' : 'black' }]}>
                         {item.text}
                </Text>
                <View style={{position:"absolute ", top:20}}>
                  <Text style={styles.timeStamp}>{item.timestamp ? formatTimestamp(item.timestamp) : ''}</Text>
                  </View>
              </View>
              
            )}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps='handled'
          />

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              {/* Attach and Camera Icons */}
              <Ionicons name="attach" size={24} color="black" style={styles.icon} />
              <Feather name="camera" size={24} color="black" style={styles.icon} />
              {/* Text Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#888"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
            </View>

            {/* Conditional Rendering of Mic/Send */}
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
              disabled={inputText.trim() === ''}
            >
              {inputText.trim() === '' ? (
                <FontAwesome name="microphone" size={24} color="white" />
              ) : (
                <Text style={styles.sendText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'black',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1974D2',
  },
  activeStatus: {
    fontSize: 14,
    color: '#4CAF50',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1974D2',
    padding: 9,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '75%',
    marginRight: 10,
    position:"relative",
    marginBottom:15,
    paddingBottom:-3,
    marginTop:20
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 9,
    paddingBottom:-3,
    position:"relative",
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '75%',
    marginBottom:15,
    textAlign:'center'
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
  },
  timeStamp: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 5,
    alignSelf: 'flex-end',
    color:"black"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 0,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    paddingLeft: 20,
    flex: 1,
    paddingVertical: 10,
    marginBottom: 0,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#1974D2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
