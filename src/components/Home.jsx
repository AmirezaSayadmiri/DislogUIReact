import React, { useEffect, useState } from "react";
import privateAxios from "../api/privateAxios";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    
  }, []);

  return <div className="text-white text-center my-10">Home</div>;
};

export default Home;
