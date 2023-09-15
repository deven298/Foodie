import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { registerUserRequest, registerUserUrl } from "./api";
import Modal from 'react-native-modal';

const RegisterUser = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRegistration = async () => {
    if (!username || !email || !password) {
        toggleModal();
    } else {
        try {
              const response = await registerUserRequest({
                "username": username.toLowerCase(),
                "email": email.toLowerCase(),
                "password": password,
              });
              // Handle successful registration
              navigation.navigate('Login');
            } catch (error) {
              // Handle registration error
              console.log("[Error] user registration failed due to ", error);
            }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity // Use TouchableOpacity for custom button
        style={styles.button}
        onPress={handleRegistration}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Please fill out all fields.</Text>
                <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.modalButton}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "orange",
      marginBottom: 20,
    },
    input: {
      width: "80%",
      height: 40,
      borderColor: "orange",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 10,
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
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        fontSize: 18,
        color: "orange",
    },
  });

export default RegisterUser;
