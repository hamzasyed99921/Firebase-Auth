import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Elements/Form";
import ForgotPassword from "./components/Elements/ForgotPassword";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 
import { collection, addDoc } from "firebase/firestore"; 
import {db} from './firebase'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Hero from "./components/Elements/Hero";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let authToken = sessionStorage.getItem("auth");
    if (authToken) {
      navigate("/home");
    }
  }, []);

  const forgetPassword =() => {
    // alert('hello')
    
    const auth = getAuth();
    sendPasswordResetEmail(auth,email).then(() => {
      console.log('Password reset link sent');
    }).catch(error => {
      console.log(error);
    })
  }

  const handleAction = (id) => {
    const authentication = getAuth();
    if(id === 2){
      createUserWithEmailAndPassword(authentication, email, password).then((res) => {
        navigate('/home')
        sessionStorage.setItem("auth", res._tokenResponse.refreshToken);
        addDoc(collection(db, "auth"), {
          email: email,
          password: password
        });
      })
      .catch((e) => {
        if(e.code == "auth/wrong-password"){
          toast.error("please check the password")
        }
        if(e.code == "auth/user-not-found"){
          toast.error("please check the email")
        }
      })
    }
    if(id === 1){
      signInWithEmailAndPassword(authentication, email, password).then((res) => {
        navigate('/home')
        sessionStorage.setItem("auth", res._tokenResponse.refreshToken);
      })
      .catch((e) => {
        if(e.code == "auth/wrong-password"){
          toast.error("please check the password")
        }
        if(e.code == "auth/user-not-found"){
          toast.error("please check the email")
        }
      })
    }
  };
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
      <Route path="/home" element={<Hero />} />
        <Route
          path="/"
          element={
            <Form
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(1)}
              
              title="Login"
            />
          }
        />
        <Route
          path="/register"
          element={
            <Form
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(2)}
              title="SignUp"
            />
          }
        />
        <Route
          path="/forget"
          element={
            <ForgotPassword title="Forgot Password" setEmail={setEmail} forgetPassword={() => forgetPassword()}/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
