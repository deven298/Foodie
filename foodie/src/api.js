
import { apiUrl } from "../config";

export const fetchMenuItems = async (data, token) => {
  try {
    return fetch(`${apiUrl}foodie/menu/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};