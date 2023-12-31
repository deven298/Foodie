import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "./auth";
import { getUserToken, loginRequest } from "./api";
import Modal from 'react-native-modal';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const { login, setToken } = useAuth();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = async (props) => {
    if (!username || !password) {
        toggleModal();
    } else {
        try {
            const loginResponse = await loginRequest({
              'username': username.toLowerCase(),
              'password': password
            }).then((res) => {
              if (res.ok) {
                return res.json();
              }
              return;
            }); 

            const tokenResponse = await getUserToken({
              'username': username.toLowerCase(),
              'password': password
            }).then((res) => res.json())

            Promise.all([loginResponse, tokenResponse])
            .then(([user, token]) => {
              if (user) {
                console.log("[Info] user data", user);
                setToken(token.access);
                login(user);
                navigation.navigate('Home');
              } else {
                toggleModal();
                console.log("[INFO] failed to authenticate user");
              }
            })
            .catch((error) => {
              console.log("[ERROR] error posting", error);
              throw error;
            });
          } catch (error) {
            toggleModal();
            console.log("[Error] user log in failed with", error);
          }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Please enter the correct credentials.</Text>
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
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
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

export default LoginScreen;
