import { StyleSheet, Text, View , TouchableOpacity,Pressable, Animated, Dimensions,TouchableWithoutFeedback,StatusBar } from 'react-native';
import React , { useState , useRef} from 'react';
import { AntDesign, Ionicons, FontAwesome6,Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from "../DrawerContext";

const home = () => {

  const { isDrawerOpen, toggleDrawer, closeDrawer, drawerHeight } = useDrawer();

  
  // Get the full height of the screen
  const screenHeight = Dimensions.get('window').height;
 




  return ( 
             <SafeAreaView style={{flex:1 , postion:"relative" ,zIndex: 0}}>
                <StatusBar barStyle="light-content" backgroundColor="#1974D2" />

                {/* Only show the touch area for closing the drawer when it's open */}
               {isDrawerOpen && (
                      <TouchableWithoutFeedback onPress={closeDrawer}>
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              zIndex: 1,
                                                
                            }}
                          />
                        </TouchableWithoutFeedback>
                      )}

                  <View style={{padding:12, backgroundColor:"#1974D2"}}   >
                     <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between", }}>

                     <TouchableOpacity onPress={toggleDrawer}>
                         <AntDesign name="bars" size={24} color="white" />
                     </TouchableOpacity>

                       <Text style={{fontSize:16, marginRight:-25, fontWeight:"600" ,color:"white"}}>checkIn & checkOut</Text>

                          <View style={{ marginRight: -30 ,position:"relative" }}> 
                          <Ionicons name="notifications-outline" size={24} color="white" />
                          <Text style={{backgroundColor:"red", height:19 ,width:17,borderRadius:10 ,alignItems:"center", position:"absolute" ,top:"-40%",right:"-5"}}>+9</Text>
                          </View>
                       

                       <FontAwesome6 name="circle-user" size={24} color="white" />
              
                    </View>
                 </View> 
                
               {/* Drawer */}
               <Animated.View style={[styles.drawer, { height: drawerHeight }]}

                      // Prevent the drawer from closing when touched
                      onStartShouldSetResponder={(e) => e.stopPropagation()} // Stop event propagation here
                      >
               
                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push("/(drop)/dashboard"); 
                                closeDrawer(); 
                              }}>
                                <MaterialCommunityIcons style={styles.icon} name="view-dashboard-outline" size={24} color="black" />
                                <Text style={styles.drawerItem}>Dashboard</Text>
                              </Pressable>

                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push('/(drop)/notification'); 
                                closeDrawer(); 
                              }}>
                                <Ionicons style={styles.icon} name="notifications-outline" size={24} color="black" />
                                <Text style={styles.drawerItem}>Notifications</Text>
                              </Pressable>

                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push('/(drop)/theme'); 
                                closeDrawer(); 
                              }}>
                                <MaterialCommunityIcons style={styles.icon} name="theme-light-dark" size={24} color="black" />
                                <Text style={styles.drawerItem}>Theme</Text>
                              </Pressable>

                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push('/(drop)/requests'); 
                                closeDrawer(); 
                              }}>
                                <Ionicons style={styles.icon} name="git-pull-request-outline" size={24} color="black" />
                                <Text style={styles.drawerItem}>Requests</Text>
                              </Pressable>

                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push('/(drop)/settings'); 
                                closeDrawer(); 
                              }}>
                                <Feather style={styles.icon} name="settings" size={24} color="black" />
                                <Text style={styles.drawerItem}>Settings</Text>
                              </Pressable>

                              <Pressable style={styles.drawerItemContainer} onPress={() => { 
                                router.push("/(check)/checkInOut"); 
                                closeDrawer(); 
                              }}>
                                <Feather style={styles.icon} name="log-out" size={24} color="black" />
                                <Text style={styles.drawerItem}>Log Out</Text>
                              </Pressable>

                          </Animated.View>

                        
                        <Pressable
                           onPress={()=> router.push("/(check)/checkInOut")}
                            
                              style={{
                                backgroundColor: "#1974D2",
                                borderRadius: 30,
                                width: 60,
                                height: 60,
                                position: "absolute",
                                bottom: 20,
                                right: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 5,
                              }}
                            >
                              <MaterialCommunityIcons name="check" size={30} color="white" />
                         </Pressable>
                        
                   

            </SafeAreaView>
    
  )
}

export default home
const styles = StyleSheet.create({
  drawer: {
    width: 230,
    backgroundColor: '#f0f0f0',
    borderBottomRightRadius: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 2,
  },
  drawerItemContainer: {
    height:45,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative', // Keeps the icon and text within the container
  },
  icon: {
    position: 'absolute',
    left: 10, // Position the icon to the left of the container
    top: '50%',
    transform: [{ translateY: -12 }], // Adjusts the icon's position to vertically center it
  },
  drawerItem: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginLeft: 40,  // Give space to the left for text, so it doesn't overlap the icon
    position: 'relative',
    top: '50%',
    transform: [{ translateY: -12 }], // Vertically centers the text
  },
});

