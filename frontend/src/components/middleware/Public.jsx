import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';

function Public(Component){
    function Public(){
        let token = localStorage.getItem('token') ?? false
        const navigate = useNavigate()
        const location = useLocation();
        const currentRoute = location.pathname;

        useEffect(()=>{
            if(token && (currentRoute == '/' || currentRoute == '/signup')){
                navigate('/profile')
            }
        },[])

        return (
            <Component/>
        );
        
    }

    return Public;
}

export default Public