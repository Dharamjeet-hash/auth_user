import { axiosInstanceAfterLogin } from "./extendAxios"; 
const API_URL = '/'; // Update this with your actual API URL

export const fetchNearestUsers = async () => {
  try {
    const response = await axiosInstanceAfterLogin.get(`/get-nearest-users`);
    return response; // Assuming the server sends back a token or user data upon successful login
  } catch (error) {
    throw error.response.data.error || 'An error occurred';
  }
};

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstanceAfterLogin.get(`/get-login-user`);
        return response; // Assuming the server sends back a token or user data upon successful login
    } catch (error) {
        throw error || 'An error occurred';
    }
};

export const updateCurrentUser = async (data) => {
    try {
        let headers = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const response = await axiosInstanceAfterLogin.post(`/update-login-user`, data, headers);
        return response; // Assuming the server sends back a token or user data upon successful login
    } catch (error) {
        throw error || 'An error occurred';
    }
};
