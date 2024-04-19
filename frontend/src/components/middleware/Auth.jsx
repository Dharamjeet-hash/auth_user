import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Auth(Component){
    function Auth(){
        let token = localStorage.getItem('token') ?? false
        const navigate = useNavigate()

        useEffect(()=>{
            if(!token){
                navigate('/')
            }
        },[])

        

        return (
            <Component/>
        );
    }

    return Auth;
}

export default Auth