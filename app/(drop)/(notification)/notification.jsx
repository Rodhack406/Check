import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable 
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Entypo } from '@expo/vector-icons';

const Notification = () => {
  const router = useRouter();

  // Sample data for past requests
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'Leave', status: 'Approved', message: 'Your leave has been approved.', opened: false },
    { id: '2', type: 'Overtime', status: 'Pending', message: 'Your overtime request has been denied.', opened: false },
    { id: '3', type: 'Claim Allowance', status: 'Approved', message: 'Your claim allowance has been processed.', opened: false },
    { id: '4', type: 'Announcement', status: 'HR', message: 'Team meeting on Friday at 10 AM.', opened: false },
    { id: '5', type: 'Leave', status: 'Denied', message: 'Your leave request has been denied.', opened: false },
    { id: '6', type: 'Leave', status: 'Pending', message: 'Your leave request is pending approval.', opened: false },
    { id: '7', type: 'Overtime', status: 'Approved', message: 'Your overtime request has been approved.', opened: false },
    { id: '8', type: 'Claim Allowance', status: 'Pending', message: 'Your claim allowance request is under review.', opened: false },
    { id: '9', type: 'Announcement', status: 'HR', message: 'New HR policies have been updated.', opened: false },
    { id: '10', type: 'Leave', status: 'Approved', message: 'Your leave for next week has been approved.', opened: false },
    { id: '11', type: 'Overtime', status: 'Denied', message: 'Your overtime request for this month has been denied.', opened: false },
    { id: '12', type: 'Claim Allowance', status: 'Approved', message: 'Your claim allowance for travel has been processed.', opened: false },
    { id: '13', type: 'Announcement', status: 'HR', message: 'Reminder: Submit your monthly report.', opened: false },
    { id: '14', type: 'Leave', status: 'Pending', message: 'Your leave request for the holiday season is pending.', opened: false },
    { id: '15', type: 'Overtime', status: 'Approved', message: 'Your overtime hours have been approved.', opened: false },
    { id: '16', type: 'Claim Allowance', status: 'Denied', message: 'Your claim allowance for meals was denied.', opened: false },
    { id: '17', type: 'Announcement', status: 'HR', message: 'HR Announcement: Office will be closed on Friday.', opened: false },
    { id: '18', type: 'Leave', status: 'Denied', message: 'Your leave request for personal reasons has been denied.', opened: false },
    { id: '19', type: 'Overtime', status: 'Pending', message: 'Your overtime request is under review.', opened: false },
    { id: '20', type: 'Claim Allowance', status: 'Pending', message: 'Your claim allowance request is pending review.', opened: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  // Filter notifications by chat type (or other criteria)
  const filterNotifications = (term) => {
    if (!term) {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications.filter((n) =>
        n.type.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredNotifications(filtered);
    }
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    filterNotifications(text);
  };

  const cancelSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);
    setFilteredNotifications(notifications);
  };

  const handlePress = (item) => {
    // Mark the notification as opened
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === item.id ? { ...n, opened: true } : n
      )
    );
    router.push({
      pathname: '/MessageScreen',
      params: {
        id: item.id,
        type: item.type,
        status: item.status,
        message: item.message,
      },
    });
  };

  // Render header: show normal header if search is inactive, otherwise show search input
  const renderHeader = () => {
    if (isSearchActive) {
      return (
        <View style={styles.headerActive}>
          <TextInput
            style={styles.searchInputActive}
            placeholder="Search chat name..."
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={handleSearchChange}
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
          <Pressable onPress={() => router.push("/home")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity onPress={() => setIsSearchActive(true)}>
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.opened && styles.unopenedCard]}
      onPress={() => handlePress(item)}
    >
      <Text style={[styles.type, !item.opened && styles.unopenedType]}>
        {item.type} - {item.status}
      </Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available</Text>}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  headerInactive: {
    height: 60,
    width: '100%',
    backgroundColor: '#1974D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerActive: {
    height: 60,
    width: '100%',
    backgroundColor: '#1974D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  searchInputActive: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
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
    paddingLeft: 5,
    paddingRight:5
  },
  notificationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 2,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  
  },
  unopenedCard: {
    backgroundColor: '#e0f7fa',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1974D2',
  },
  unopenedType: {
    fontWeight: '900',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
