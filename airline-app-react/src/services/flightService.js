import axios from 'axios';

const API_URL = 'https://airline-app-image-941806167555.us-central1.run.app/flight';

export const getAllFlights = async () => {
  try {
    const response = await axios.get(API_URL + '/');
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
}; 