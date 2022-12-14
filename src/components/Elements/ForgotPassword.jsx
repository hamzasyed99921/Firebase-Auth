import React from "react";
import { Button as TButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const Form = ({ title, setEmail, forgetPassword }) => {
  return (
    <>
      <div className="container pt-5">
        <div className="text-center">
          <h2>{title} </h2>
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
        
            <TButton variant="contained"  onClick={forgetPassword} >Send Link</TButton>
            <div className="bottem_txt">
              <p>Back to <Link to="/">Login</Link></p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Form;
