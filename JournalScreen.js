import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MoodInput from '../components/MoodInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from 'react-native';


const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const [selectedMoodFilter, setSelectedMoodFilter] = useState(null);

  useEffect(() => {
    const loadEntries = async () => {
      const storedEntries = await AsyncStorage.getItem('journalEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    };
    loadEntries();
  }, []);
  const filteredEntries = selectedMoodFilter ? entries.filter(entry => entry.mood === selectedMoodFilter) : entries;
  const countMoodFrequencies = () => {
    const frequencies = {};
    entries.forEach((entry) => {
      const mood = entry.mood;
      frequencies[mood] = frequencies[mood] + 1 || 1;
    });
    return frequencies;
  };

  const addEntry = async (entry) => {
    const newEntry = { ...entry, timestamp: new Date().toString() };
    const updatedEntries = [newEntry, ...entries];
    await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    Keyboard.dismiss();
  };

  const deleteEntry = async (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const moodFrequencies = countMoodFrequencies();

  return (
    <View style={styles.container}>
      <MoodInput onAddEntry={addEntry} />
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.entryCard}>
            <View>
              {item.timestamp ? (
                <Text style={styles.entryText}>
                  {new Date(item.timestamp).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{" "}
                  |{" "}
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
              ) : null}
              <Text style={styles.entryText}>{item.mood}</Text>
              {item.additionalText ? <Text style={styles.entryText}>{item.additionalText}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => deleteEntry(index)}>
              <Text style={styles.trashIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 340,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  entryText: {
    fontSize: 18,
  },
  trashIcon: {
    fontSize: 18,
  },
  moodFrequencyText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default JournalScreen;
