import React, { useEffect, useState } from "react";
import privateAxios from "../api/privateAxios";
import { Button } from "@mui/material";

const Home = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {}, []);

    return (
        <div className="text-white text-center my-10">
            <div className="flex items-center justify-center">
              <Button variant="contained" href="/ask-question" color="success">ایجاد سوال</Button>
            </div>
        </div>
    );
};

export default Home;
