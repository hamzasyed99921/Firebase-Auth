import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("auth");
    if(authToken){
      navigate('/home')
    }if(!authToken){
      navigate('/')
    }
  }, []);

  const logout = ( ) => {
    sessionStorage.removeItem('auth');
    navigate('/')
    toast("LogOut Successfully!")
  }
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
      <h2>Home</h2>
    <Button variant="contained" onClick={logout}>Logout</Button>
      </div>
    </>
  )
}

export default Hero