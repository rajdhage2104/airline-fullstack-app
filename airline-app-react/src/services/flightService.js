import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:9000/flight';

const getAuthHeader = () => {
  const user = getCurrentUser();
  console.log('Current user:', user); // For debugging
  
  if (user && user.token) {
    return {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};

export const getAllFlights = async () => {
  try {
    const headers = getAuthHeader();
    console.log('Request headers:', headers);
    
    const response = await axios.get(`${API_URL}/`, {
      headers: headers,
      withCredentials: true
    });
    
    console.log('Flights response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error.response || error);
    throw error;
  }
};

export const addFlight = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/`, flightData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error adding flight:', error);
    throw error;
  }
}; 