import React from "react";
import { Button as TButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import { Link } from "react-router-dom";

const Form = ({
  title,
  setEmail,
  setPassword,
  handleAction,
  forgetPassword,
}) => {
  return (
    <>
      <div className="container pt-5">
        <div className="text-center">
          <h2>{title} Form</h2>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button title={title} handleAction={handleAction} />
          <div className="bottem_txt">
            {title === "Login" ? (
              <p>
                Don't Have an account <Link to="/register">SignUp</Link>
              </p>
            ) : (
              <p>
                Already Have an account <Link to="/">Login</Link>
              </p>
            )}
            <p className="text-center">
              <Link to="/forget">Forget Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
