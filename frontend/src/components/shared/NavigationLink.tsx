import React from "react";
import { Link } from "react-router-dom";
import "./NavigationLink.css";

type NavigationLinkProps = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link
      className="navlink"
      to={props.to}
      style={{
        textDecoration: "none",
        backgroundColor: props.bg,
        color: props.textColor,
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
