import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { countMoodFrequencies } from '../utils/database';
import { useNavigation } from '@react-navigation/native';


const AnalyticsScreen = () => {
 const [moodCounts, setMoodCounts] = useState({});
 const navigation = useNavigation();
 useFocusEffect(
   React.useCallback(() => {
     const loadEntries = async () => {
       try {
         const storedEntries = await AsyncStorage.getItem('journalEntries');
         if (storedEntries) {
           const entries = JSON.parse(storedEntries);
           const newMoodCounts = countMoodFrequencies(entries);
           setMoodCounts(newMoodCounts);
         }
       } catch (error) {
         console.error("Error loading entries:", error);
       }
     };
     loadEntries();
   }, [])
 );

 const isFeelingDown = moodCounts["😢"] > 2;

 

 return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Analytics</Text>
      {Object.entries(moodCounts).map(([mood, count], index) => (
        <View key={index}>
          <Text style={styles.moodText}>
            {mood}: {count}
          </Text>
        </View>
      ))}
      {isFeelingDown && (
        <>
          <Text style={styles.messageText}>Hey, it looks like you're feeling a little down.</Text>
          <TouchableOpacity 
    style={styles.underlineButton}
    onPress={() => navigation.navigate('Home')}
>
    <Text style={styles.underlineButtonText}>Check out some of our resources to help you ❤️</Text>
</TouchableOpacity>

        </>
      )}
    </View>
 );

};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#74c9cc',
   alignItems: 'center',
   justifyContent: 'center',
 },
 header: {
   fontSize: 50,
   fontFamily: 'Futura',
   color: 'white',
   marginBottom: 10,
   textDecorationLine: 'underline',
 },
 moodText: {
   fontSize: 50,
   marginBottom: 10,
   color: 'white',
  // backgroundColor: 'blue',
 },
 messageText: {
   fontSize: 35,
   color: 'white',
   marginTop: 20,
   marginBottom: 20,
   marginLeft: 10,
   fontFamily: 'Futura',
 },
 underlineButton: {
   marginTop: 15,
   alignItems: 'center',
   fontFamily: 'Futura',
 },
 underlineButtonText: {
   fontSize: 30,
   padding: 10,
   textAlign: 'center',
   color: 'black',
   backgroundColor: '#d9fffb',
   fontFamily: 'Futura',


 }
});

export default AnalyticsScreen;
