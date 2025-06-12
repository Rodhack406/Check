import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable 
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import {router} from 'expo-router'

const History = () => {
  // Sample data for past requests
  const pastRequests = [
    { id: '1', type: 'Overtime', status: 'Approved', reason: 'Worked extra hours on project', date: '2024-12-10', comments: 'Great work!' },
    { id: '2', type: 'Leave', status: 'Pending', reason: 'Sick leave', date: '2024-12-12', comments: '' },
    { id: '3', type: 'Claim', status: 'Rejected', reason: 'Travel allowance claim', date: '2024-12-15', comments: 'Insufficient documentation' },
    { id: '4', type: 'Overtime', status: 'Approved', reason: 'Extra hours on deadline', date: '2024-12-20', comments: 'Well done!' },
    { id: '5', type: 'Leave', status: 'Denied', reason: 'Your leave request has been denied.', date: '2024-12-22', comments: '' },
    // ... add more if needed
  ];

  const [notifications, setNotifications] = useState(pastRequests);
  const [search, setSearch] = useState('');
  const [filteredRequests, setFilteredRequests] = useState(pastRequests);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter notifications based on search input
  const handleFilter = (searchTerm) => {
    if (!searchTerm) {
      setFilteredRequests(notifications);
    } else {
      const filtered = notifications.filter(
        request =>
          request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  };

  const onChangeSearch = (text) => {
    setSearch(text);
    handleFilter(text);
  };

  const cancelSearch = () => {
    setSearch('');
    setIsSearchActive(false);
    setFilteredRequests(notifications);
  };

  // Render header conditionally
  const renderHeader = () => {
    if (isSearchActive) {
      return (
        <View style={styles.headerActive}>
          <TextInput
            style={styles.searchInputActive}
            placeholder="Search by request type or status"
            placeholderTextColor="#888"
            value={search}
            onChangeText={onChangeSearch}
            autoFocus
          />
          <TouchableOpacity onPress={cancelSearch} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.headerInactive}>
          <Pressable onPress={() => router.push("/requests")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>History</Text>
          <TouchableOpacity onPress={() => setIsSearchActive(true)}>
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.requestTitle}>{item.type} Request</Text>
      <Text style={styles.requestDetail}>Date: {item.date}</Text>
      <Text style={styles.requestDetail}>Status: {item.status}</Text>
      <Text style={styles.requestDetail}>Reason: {item.reason}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available</Text>}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightgray' ///'#fff',
  },
  // Inactive header styling
  headerInactive: {
    height: 60,
    width: "100%",
    backgroundColor: '#1974D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // Active header styling (search mode)
  headerActive: {
    height: 60,
    width: "100%",
    backgroundColor: '#1974D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    color: "white",
    textAlign: 'center',
    flex: 1,
  },
  searchInputActive: {
    flex: 1,
    height: 40,
    backgroundColor:'#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    padding: 0,
    paddingLeft:5,
    paddingRight:5
  },
  notificationCard: {
    backgroundColor: 'lightgray',//'#f9f9f9',
    padding: 15,
    marginVertical: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1974D2',
  },
  requestDetail: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
