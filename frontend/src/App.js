// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/Login';
import ProfileUpdateForm from './components/afterLogin/profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeforeLogin from './components/Layout/beforeLogin'
import AfterLogin from './components/Layout/afterLogin'

const App = () => {
  // Example authentication logic
  const isAuthenticated = localStorage.getItem('token') ?? false; // Set to true if the user is authenticated
  const redirectTo = '/profile'; // Specify the profile page as the redirect destination
  
  return (
    <>
      <ToastContainer />
      <Router>
        <BeforeLogin/>
        <AfterLogin/>
      </Router>
    </>
    
  );
};

export default App;
