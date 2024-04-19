// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { loginRequest } from '../../utils/apiReq/auth';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = ({ onSubmit }) => {

  const [formErrors, setFormError] = useState({})
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginRequest(formData).then((res)=>{
      if(res.status == 200){
        setFormError({})
        setFormData({})
        localStorage.setItem('token',res?.data?.token)
        toast('Login Successfully')
        navigate('/profile')

      }
    }).catch((error)=>{
      let errors = error?.response?.data?.errors
      setFormError(errors)
    })
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData?.email}
              onChange={handleChange}
            />
            {formErrors?.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData?.password}
              onChange={handleChange}
            />
            {formErrors?.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
