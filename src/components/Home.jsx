import React, { useEffect, useState } from "react";
import privateAxios from "../api/privateAxios";
import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const Home = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {}, []);

    return (
        <div className="text-white text-center m-10">
            <div className="flex justify-center items-center">
                <input className="px-10 text-black py-2" type="text" placeholder="جستجو..." />
                <div className="border cursor-pointer hover:bg-blue-900 px-4 py-[7px] bg-blue-950 rounded-l-xl">
                    <Search />
                </div>
            </div>

            <div className="flex items-center justify-start">
                <Button variant="contained" href="/ask-question" color="success">
                    ایجاد سوال
                </Button>
            </div>
        </div>
    );
};

export default Home;
