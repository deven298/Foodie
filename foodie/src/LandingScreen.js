import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const handleSignup = () => {
    // Navigate to the signup screen
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./foodie-logo.png')} // Replace with your logo image
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Welcome to Foodie</Text>
      <Text style={styles.subtitle}>Discover and savor delicious food</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Background color is white
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange', // Title color is orange
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'orange', // Subtitle color is orange
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'orange', // Button background color is orange
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Button text color is white
  },
});

export default LandingScreen;
