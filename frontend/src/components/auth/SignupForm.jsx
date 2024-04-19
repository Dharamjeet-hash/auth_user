import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { signUpRequest } from '../../utils/apiReq/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const ProfileUpdateForm = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    profilePic: '', // Initially set to null
    lat: '',
    long: '',
    zipcode:''
  });
  const [formErrors, setFormError] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = {...formErrors}
    delete errors[name]
    setFormError(errors)
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    let errors = {...formErrors}
    delete errors['profilePic']
    setFormError(errors)

    const file = e.target.files[0];
    setProfileData(prevData => ({
      ...prevData,
      profilePic: file
    }));
    e.target.value = ''
  };

  const handleSubmit = async (e) => {
    try{
        e.preventDefault();
        // Handle form submission, including profilePic file upload
        let formData = new FormData();
        Object.keys(profileData).forEach(fieldName => {
            formData.append(fieldName, profileData[fieldName]);
        })
        signUpRequest(formData).then((res)=>{
            if(res.status == 201){
                toast("Your account created successfully");
                setFormError({})
                setProfileData({})
                navigate('/')
            }
        }).catch((error)=>{
            let errors = error?.response?.data?.errors
            setFormError(errors)
        })
        
    }catch(error){
        console.log(error)
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Update Profile
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              type="text"
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.name}
              onChange={handleChange}
            />
            {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.email}
              onChange={handleChange}
            />
            {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.password}
              onChange={handleChange}
            />
            {formErrors.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
            <TextField
              label="Mobile"
              type="text"
              name="mobile"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.mobile}
              onChange={handleChange}
            />
            {formErrors.mobile && <div style={{ color: 'red' }}>{formErrors.mobile}</div>}
            <TextField
              label="Zipcode"
              type="text"
              name="zipcode"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.zipcode}
              onChange={handleChange}
            />
            {formErrors.zipcode && <div style={{ color: 'red' }}>{formErrors.zipcode}</div>}
            <TextField
              label="Latitude"
              type="text"
              name="lat"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.lat}
              onChange={handleChange}
            />
            {formErrors.lat && <div style={{ color: 'red' }}>{formErrors.lat}</div>}
            <TextField
              label="Longitude"
              type="text"
              name="long"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData.long}
              onChange={handleChange}
            />
            {formErrors.long && <div style={{ color: 'red' }}>{formErrors.long}</div>}
            <input
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the default file input UI
              id="profilePicInput"
            />
            <label htmlFor="profilePicInput">
              <Button component="span" variant="contained" color="primary">
                Choose Profile Picture
              </Button>
            </label>
            {formErrors.profilePic && <div style={{ color: 'red' }}>{formErrors.profilePic}</div>}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
              SignUp
            </Button>   
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileUpdateForm;
