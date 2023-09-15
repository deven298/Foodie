
import { apiUrl } from "../config";
import * as SecureStore from 'expo-secure-store';

// DB constants
export const registerUserUrl = `${apiUrl}foodie/register/`;
export const loginUserUrl = `${apiUrl}foodie/login/`;
export const logoutUserUrl = `${apiUrl}foodie/logout/`;
export const tokenUserUrl = `${apiUrl}foodie/token/`;
export const refreshUserTokenUrl = `${apiUrl}foodie/token/refresh/`;
export const placeOrderUrl = `${apiUrl}foodie/order/`;
export const previousOrderUrl = `${apiUrl}foodie/orders/`;
export const inprogressOrderUrl = `${apiUrl}foodie/orders/inprogress`;
export const menuUrl = `${apiUrl}foodie/menu/`;

export const fetchMenuItems = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');

    const response = await fetch(menuUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the data
    } else {
      throw await response.json(); // Throw the error response as an object
    }
  } catch (error) {
    throw error;
  }
};

export const registerUserRequest = async (data) => {

  const postData = JSON.stringify(data);
  try {
    return fetch(registerUserUrl, {
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

export const loginRequest = async (data) => {

  const postData = JSON.stringify(data);
  try {
    return fetch(loginUserUrl, {
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

export const logoutPost= async (data) => {
  const postData = JSON.stringify(data);
  try {
    return fetch(logoutUserUrl, {
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

export const getUserToken = async (data) => {
  const postData = JSON.stringify(data);
  try {
    return fetch(tokenUserUrl, {
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

export const placeOrder = async (data) => {
  const postData = JSON.stringify(data)
  try {
    const token = await SecureStore.getItemAsync('token');

    return fetch(placeOrderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:postData,
    });
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await fetch(previousOrderUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the data
    } else {
      throw await response.json(); // Throw the error response as an object
    }
  } catch (error) {
    throw error;
  }
};