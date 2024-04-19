import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/Login';
import Public from '../middleware/Public'
function BeforeLogin(){
    return (
        <Routes>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/" element={<LoginForm />}></Route>
        </Routes>
    )
}

export default Public(BeforeLogin)