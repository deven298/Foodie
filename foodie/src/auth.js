import axios from "axios";
import React, { createContext, useContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { apiUrl } from "../config";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
  }

  const login = (userData) => {
    // Implement user login logic here and set the user object.
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement user logout logic here and reset the user object.
    setUser(null);
    setIsLoggedIn(false);
  };

  const globalcontext = {
    user,
    setUser,
    login,
    logout,
    isLoggedIn,
    setIsLoggedIn,
    setToken
  }

  return (
      <SafeAreaProvider>
      <AuthContext.Provider value={globalcontext}>
          {children}
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};
  
export const useAuth = () => useContext(AuthContext);

// DB constants
export const registerUserUrl = `${apiUrl}foodie/register/`;
export const loginUserUrl = `${apiUrl}foodie/login/`;

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    console.log('No values stored under that key.');
    return null;
  }
}

// Create a function for making POST requests
export const loginPost = async (url, data) => {

  const postData = JSON.stringify(data);
  try {
    return fetch(url, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: postData
    })
  } catch (error) {
    throw error;
  }

};

export const get = async (url, data, token) => {
  const requestData = JSON.stringify(data);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json", // Replace with the appropriate content type
          // 'Authorization': `Bearer ${token}`, // Replace with your authentication token
      },
      body: requestData,
      })
  console.log("[Info] data received ", response);
  const responseData = await response.json();
  console.log("[Info] data received ", responseData);
  return responseData
  } catch(error) {
    throw error;
  }
};
