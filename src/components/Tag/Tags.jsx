import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Tags = () => {
    const navigate = useNavigate()

    const [tags, setTags] = useState([]);

    const getTags = async () => {
        try{
            const res = await axios.get("/tags");
            if(res.status===200){
                setTags(res.data.tags);
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getTags();
    },[])

    return <div className="p-10 text-white flex flex-col gap-2">
        <h1>تگ ها:</h1>
        {tags.map(tag=>(
            <div onClick={()=>navigate("/tags/"+tag.id)} key={tag.id} className="border-2 p-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                {tag.name}
            </div>
        ))}
    </div>;
};

export default Tags;
