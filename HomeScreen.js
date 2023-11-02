import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Helper function to handle phone number click
  const handlePhoneNumberPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to HAAL 🤍</Text>
      <Text style={styles.resourceText}>💚 resources 💚</Text>

      <Text style={styles.helpText}>
        → call the National Alliance on Mental Illness  |  
        <Text 
          style={styles.clickable} 
          onPress={() => handlePhoneNumberPress('+1800950NAMI')}
        >
           (+1) 800-950-NAMI
        </Text>
      </Text>

      <Text style={styles.helpText}>
        → call the National Suicide Prevention Line  |
        <Text 
          style={styles.clickable}
          onPress={() => handlePhoneNumberPress('+1800273TALK')}
        >
           (+1) 800-273-TALK
        </Text>
      </Text>

      <Text style={styles.helpText}>
        → find a treatment option location near you  |    
        <Text 
          style={styles.clickable}
          onPress={() => handlePhoneNumberPress('+1800662HELP')}
        >
          (+1) 800-662-HELP
        </Text>
      </Text>

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
  welcomeText: {
    fontSize: 60,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 10,
    color: 'white',
    fontFamily: 'Futura',
  },
  resourceText: {
    fontSize: 35,
    marginBottom: 20,
    color: '#ecffe8',
    fontFamily: 'Futura',
    textDecorationLine: 'underline',
  },
  helpText: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 10,
    color: 'white',
    fontFamily: 'Futura',
  },
  clickable: {
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
