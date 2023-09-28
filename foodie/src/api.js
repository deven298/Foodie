
import { apiUrl, socketUrl } from "../config";
import * as SecureStore from 'expo-secure-store';

// DB constants
export const registerUserUrl = `${apiUrl}foodie/register/`;
export const loginUserUrl = `${apiUrl}foodie/login/`;
export const logoutUserUrl = `${apiUrl}foodie/logout/`;
export const tokenUserUrl = `${apiUrl}foodie/token/`;
export const refreshUserTokenUrl = `${apiUrl}foodie/token/refresh/`;
export const placeOrderUrl = `${apiUrl}foodie/order/`;
export const reviewOrderUrl = `${apiUrl}foodie/order/review/`;
export const previousOrderUrl = `${apiUrl}foodie/orders/`;
export const inprogressOrderUrl = `${apiUrl}foodie/orders/inprogress`;
export const menuUrl = `${apiUrl}foodie/menu/`;

export const deliveryUrl = `${socketUrl}foodies/delivery/`;

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
      return data;
    } else {
      throw await response.json();
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
    });
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

export const reviewOrder = async (data) => {
  const postData = JSON.stringify(data)
  // console.log("[Info] sending review for order with data: ", postData);
  try {
    const token = await SecureStore.getItemAsync('token');

    return fetch(reviewOrderUrl, {
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
      return data;
    } else {
      throw await response.json();
    }
  } catch (error) {
    throw error;
  }
};


// NOTE: get order delivery updates
// export const getOrderDeliveryStatus = (uid, order_id, onStatusReceived, onError) => {
//   try {
//     const foodieSocket = new WebSocket(deliveryUrl);
//     const request = {
//       type: 'delivery_status_request',
//       user_id: uid,
//       order_id: order_id,
//     };

//     foodieSocket.send(JSON.stringify(request));
//     foodieSocket.onmessage = (e) => {
//       const message = JSON.parse(e.data);
//       if (message.type === 'delivery_status') {
//         const deliveryStatus = message.status;
//         console.log('Delivery Status:', deliveryStatus);
//         onStatusReceived(deliveryStatus);
//       } else if (message.type === 'delivery_status_failed') {
//         console.error('Delivery Status Request Failed');
//         onError('Delivery Status Request Failed');
//       }
//       foodieSocket.close();
//     };
//     // Don't forget to close the WebSocket connection when you're done
//     // ws.close();
//   } catch (error) {
//     console.error('[Error] delivery status update', error);
//     onError(error.message);
//   }
// };