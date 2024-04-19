import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}`, // Replace 'https://example.com' with your root domain
  timeout: 5000, // Set a default timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    
    // You can add any default headers here if needed
  }
});


export const axiosInstanceAfterLogin = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}`, // Replace 'https://example.com' with your root domain
  timeout: 5000, // Set a default timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${localStorage?.getItem('token')}`
    // You can add any default headers here if needed
  }
});
