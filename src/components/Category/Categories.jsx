import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try{
            const res = await axios.get("/categories");
            if(res.status===200){
                setCategories(res.data.categories);
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return <div className="p-10 text-white flex flex-col gap-2">
        <h1>دسته بندی ها:</h1>
        {categories.map(category=>(
            <div onClick={()=>navigate("/categories/"+category.id)} key={category.id} className="border-2 p-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                {category.name}
            </div>
        ))}
    </div>;
};

export default Categories;
