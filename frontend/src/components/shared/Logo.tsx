import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src="openai.png" alt="openai" className="image-inverted" />
      </Link>
      <Typography
        variant="h4"
        className="text-inverted"
        sx={{
          display: { md: "block", sd: "none" },
          mr: "auto",
          fontSize: "20px",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>-GPT
      </Typography>
    </div>
  );
};

export default Logo;
