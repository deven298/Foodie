import React, { createContext, useContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
  }

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
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