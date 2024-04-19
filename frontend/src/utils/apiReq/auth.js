import { axiosInstance } from "./extendAxios"; 
const API_URL = '/'; // Update this with your actual API URL

export const loginRequest = async (data) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    return response; // Assuming the server sends back a token or user data upon successful login
  } catch (error) {
    throw error
  }
};

export const signUpRequest = async (data) => {
    try {
      let headers = {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    }
        const response = await axiosInstance.post(`/register`, data, headers);
        return response; // Assuming the server sends back a token or user data upon successful login
    } catch (error) {
      throw error
    }
  };
