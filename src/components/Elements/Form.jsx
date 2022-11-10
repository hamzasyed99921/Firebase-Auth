import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";

const Form = ({ title, setEmail, setPassword, handleAction }) => {
  return (
    <>
      <div className="container pt-5">
        <div className="text-center">
          <h2>{title} Form</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
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

            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button title={title} handleAction={handleAction} />
          </Box>
        </div>
      </div>
    </>
  );
};

export default Form;
