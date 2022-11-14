import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Elements/Form";
import ForgotPassword from "./components/Elements/ForgotPassword";
import ResetPass from "./components/Elements/ResetPass";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Link, useFetcher, useSearchParams } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from "firebase/auth";
import Hero from "./components/Elements/Hero";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setquery] = useState(searchParams.get("oobCode"));
  // const [mode, setmode] = useState(searchParams.get("mode"));
  // console.log(mode);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let authToken = sessionStorage.getItem("auth");
    if (authToken) {
      navigate("/home");
    }
  }, []);



  const ResetPassword = () => {
    const auth = getAuth();
    // console.log(auth);
    confirmPasswordReset(auth, query, newPassword)
    .then((res) => {
        toast("Password Updated");
      })
      .catch((error) => {
        console.log(error);
      });
      verifyPasswordResetCode(auth, query).then((email) => {
        const accountEmail = email;
        console.log(email);
      })
      
    const docRef = doc(db, "auth", 'zkZwdQySDDfW3CkKzU9b7S7665r1');
    const data = {
      password: newPassword,
    };
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const forgetPassword = () => {
    const auth = getAuth();
   
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast("Password reset link sent");
        
      })
      .catch((error) => {
        if (error.code == "auth/missing-email") {
          toast.error("please enter the email");
        }
        if (error.code == "auth/user-not-found") {
          toast.error("Email does not exist!");
        }
        console.log(error);
      });
  
  };

  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((res) => {
          navigate("/home");
          toast("Login Successfully!");
          sessionStorage.setItem("auth", res._tokenResponse.refreshToken);
          const user = authentication.currentUser;
          // console.log(user.uid);

          setDoc(doc(db, "auth", res.user.uid), {
            email: email,
            password: password,
          });
        })
        .catch((e) => {
          if (e.code == "auth/wrong-password") {
            toast.error("please check the password");
          }
          if (e.code == "auth/user-not-found") {
            toast.error("please check the email");
          }
        });
    }
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((res) => {
          navigate("/home");
          toast("Login Successfully!");
          sessionStorage.setItem("auth", res._tokenResponse.refreshToken);
          
        })
        .catch((e) => {
          if (e.code == "auth/wrong-password") {
            toast.error("please check the password");
          }
          if (e.code == "auth/user-not-found") {
            toast.error("please check the email");
          }
        });
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
            <ForgotPassword
              title="Forgot Password"
              setEmail={setEmail}
              forgetPassword={() => forgetPassword()}
            />
          }
        />
        <Route
          path="/reset"
          element={
            <ResetPass
              title="Reset Password"
              setNewPassword={setNewPassword}
              ResetPassword={() => ResetPassword()}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
