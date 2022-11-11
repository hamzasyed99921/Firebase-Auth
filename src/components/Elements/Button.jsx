import React from 'react'
import { Button as MButton } from "@mui/material";

const Button = ({title,handleAction}) => {
  return (
    <div>

    <MButton variant="contained" className="buton" onClick={handleAction}>{title}</MButton>
    </div>
  )
}

export default Button