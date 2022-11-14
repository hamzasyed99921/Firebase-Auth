import React,{useState} from "react";
import { Button as TButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useFetcher, useSearchParams } from "react-router-dom";



const ResetPass = ({title, setNewPassword, ResetPassword}) => {

   const [searchParams, setSearchParams] = useSearchParams();
   const [query, setquery] = useState((searchParams.get('oobCode')));
//    console.log(query);
//    const res = useFetch()
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
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setNewPassword(e.target.value)}
            />

          </Box>
        
            <TButton variant="contained"  onClick={ResetPassword} >{title}</TButton>
            <div className="bottem_txt">
              <p>Back to <Link to="/">Login</Link></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default ResetPass