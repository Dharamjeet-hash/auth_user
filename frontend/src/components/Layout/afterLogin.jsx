import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProfileUpdateForm from '../afterLogin/profile';
import NearestUsers from '../afterLogin/NearestUsers';
import Auth from '../middleware/Auth'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
function AfterLogin(){
    const navigate = useNavigate()

    function LogOut(e){
        localStorage.removeItem('token')
        setTimeout(()=>{
            navigate('/')
        },500)
    }

    function openNearestUsers(e){
        navigate('/users')
    }

    const openUpdateProfile = () => navigate('/profile');
    
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={(e)=>{LogOut(e)}}>
                        <Typography variant="h6" color="inherit" component="div">
                            Logout
                        </Typography>
                    </IconButton>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={(e)=>{openNearestUsers(e)}}>
                        <Typography variant="h6" color="inherit" component="div">
                            Click Here To Show Nearest Users
                        </Typography>
                    </IconButton>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={(e)=>{openUpdateProfile(e)}}>
                        <Typography variant="h6" color="inherit" component="div">
                            Update Profile
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route
                    path="/profile"
                    element={<ProfileUpdateForm />}
                />

                <Route
                    path="/users"
                    element={<NearestUsers />}
                />
            </Routes>
        </>
    )
}

export default Auth(AfterLogin)