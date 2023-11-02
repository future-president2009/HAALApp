import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MoodInput = ({ onAddEntry }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [additionalText, setAdditionalText] = useState('');

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  const handleAddEntry = () => {
    onAddEntry({ mood: selectedMood, additionalText });
    setSelectedMood(null);
    setAdditionalText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>How are you feeling?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, selectedMood === '😀' && styles.selected]} onPress={() => handleMoodSelection('😀')}>
          <Text style={styles.emoji}>😀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedMood === '😢' && styles.selected]} onPress={() => handleMoodSelection('😢')}>
          <Text style={styles.emoji}>😢</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedMood === '😐' && styles.selected]} onPress={() => handleMoodSelection('😐')}>
          <Text style={styles.emoji}>😐</Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Anything you'd like to add?"
        value={additionalText}
        onChangeText={setAdditionalText}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
        <Text style={styles.addEntry}>Add this entry!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    fontSize: 24,    
    fontFamily: 'Avenir',
    textAlign: 'center'

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
  selected: {
    backgroundColor: '#74c9cc', // Light blue to indicate selection
  },
  emoji: {
    fontSize: 48, // Large emoji
  },
  textInput: {
    height: 180, // Bigger height
    width: 350, // Preset width
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    fontSize: 20, // Larger font
    paddingLeft: 6,
    fontFamily: 'Avenir'
  },
  addButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#74c9cc',
    color: 'white',
    marginBottom: 10,
    alignItems: 'center'
    
  },
  addEntry:
  {
    color: 'white', 
    fontSize: 20,
    fontFamily: 'Avenir',
  }
});

export default MoodInput;
