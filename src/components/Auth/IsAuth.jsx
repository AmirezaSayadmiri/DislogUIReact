import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuth = ({ children, guest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (guest && isLoggedIn) {
      navigate("/");
    } else if (!guest && !isLoggedIn) {
      navigate("/login");
    }
  }, []);
  
  return children;
};

export default IsAuth;
