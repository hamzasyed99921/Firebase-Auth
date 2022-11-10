import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("auth");
    if(authToken){
      navigate('/home')
    }if(!authToken){
      navigate('/login')
    }
  }, []);

  const logout = ( ) => {
    sessionStorage.removeItem('auth');
    navigate('/login')
  }
  return (
    <>
    <h2>Home</h2>
    <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default Hero