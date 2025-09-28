import axios from "axios";

// Make sure you set this in your .env file in the frontend project:
// VITE_API_URL=https://letsdonate-backend.railway.app
const API_URL = import.meta.env.VITE_API_URL;

// Create a new "Need Blood" entry
export const createNeedBlood = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create-need-blood`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating need blood entry:", error);
    throw error;
  }
};

// Insert a new user
export const insertNewUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/insert-new-users`, data);
    return response.data;
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
};

// Create a "Donate Blood" entry
export const createDonateBlood = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create-donate-blood`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating donate blood entry:", error);
    throw error;
  }
};

// Create a "Host Blood Drive" entry
export const createHostBloodDrive = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create-host-blood-drive`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating host blood drive entry:", error);
    throw error;
  }
};
