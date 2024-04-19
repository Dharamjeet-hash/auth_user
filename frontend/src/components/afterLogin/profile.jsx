import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import { getCurrentUser, updateCurrentUser } from '../../utils/apiReq/users';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ProfileUpdateForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    profilePic: ''
  });
  const [formErrors, setFormError] = useState({})

  const navigate = useNavigate()

  useEffect(()=>{
    setProfileData({})
    getCurrentUser().then((res)=>{
        if(res?.status == 200){
          let profile = {...res?.data}
          delete profile['password']
          delete profile['_id']
          delete profile['lat']
          delete profile['long']
          delete profile['__v']
          setProfileData(profile)
        }
    }).catch(()=>{

    })
},[])


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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including profilePic file upload

    let profile = {...profileData}
    delete profile['password']
    delete profile['_id']
    delete profile['lat']
    delete profile['long']
    delete profile['__v']
    let formData = new FormData();
    Object.keys(profile).forEach(fieldName => {
        formData.append(fieldName, profileData[fieldName]);
    })
    updateCurrentUser(formData).then((res)=>{
      if(res?.status == 200){
        toast("Your account updated successfully");
        setFormError({})
        res?.data && setProfileData(res?.data)
      }
    }).catch((error)=>{
      let errors = error?.response?.data?.errors
      console.log(error?.response)
      setFormError(errors)
    })
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={8} lg={8}>
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
              value={profileData?.name}
              onChange={handleChange}
            />
            {formErrors?.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData?.email}
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
              onChange={handleChange}
            />
            {formErrors?.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
            <TextField
              label="Mobile"
              type="text"
              name="mobile"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData?.mobile}
              onChange={handleChange}
            />
            {formErrors?.mobile && <div style={{ color: 'red' }}>{formErrors.mobile}</div>}
            <TextField
              label="Address"
              type="text"
              name="address"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profileData?.address}
              onChange={handleChange}
            />
            {formErrors?.address && <div style={{ color: 'red' }}>{formErrors.address}</div>}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="profilePicInput"
            />
            <label htmlFor="profilePicInput">
              <Button component="span" variant="contained" color="primary">
                Upload Profile Picture
              </Button>  
              <Box component="img" 
                sx={{
                    height: 100,
                    width: 100,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                src={apiUrl+'/'+profileData?.profilePic}/>
            </label>

            {formErrors?.profilePic && <div style={{ color: 'red' }}>{formErrors.profilePic}</div>}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
              Update Profile
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileUpdateForm;
