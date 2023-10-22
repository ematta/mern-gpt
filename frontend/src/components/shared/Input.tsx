import React from "react";
import { TextField } from "@mui/material";
import "./Input.css";

interface Props {
  name: string;
  label: string;
  type?: string;
}

const Input = (props: Props) => {
  return (
    <TextField
      margin="normal"
      className={"input"}
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
};

export default Input;
