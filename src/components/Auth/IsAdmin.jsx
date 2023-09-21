import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user.role!=="admin"){
            navigate("/")
        }
    }, []);

    return children;
};

export default IsAdmin;
