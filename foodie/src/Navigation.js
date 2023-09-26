import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import RegisterUser from './RegisterUser';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { useAuth } from './auth';
import OrderHistory from './OrderHistory';
import OrderReview from './OrderReview';

const Stack = createStackNavigator();
// const Switch = createSwitchNavigator();

  const Navigation = () => {
    const { isLoggedIn } = useAuth();
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {(!isLoggedIn) ? (
            <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={RegisterUser}
              options={{
                headerShown: false,
                headerTitle: null,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                headerTitle: null,
                headerBackVisible: false,
              }}
            />
            </>
          ) : (
            <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Orders"
              component={OrderHistory}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="OrderReview"
              component={OrderReview}
              options={{ headerShown: false }}
            />
            </>
          )}
        </ Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default Navigation;