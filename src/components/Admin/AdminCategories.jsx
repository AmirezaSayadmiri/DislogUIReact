import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Category, Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import TextError from "../TextError";
import { Modal } from "@mui/material";
import AdminCategory from "./AdminCategory";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getCategories = async () => {
        try {
            const res = await axios.get("/categories");
            if (res.status === 200) {
                setCategories(res.data.categories);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const res = await privateAxios.post("/categories/", {
                name: category,
            });
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "دسته بندی با موفقیت ساخته شد", severity: "success" }));
                getCategories();
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response.data.errors.map((e) => e.msg));
        }
    };

    return (
        <div className="p-10 flex flex-col gap-2">
            <div className="flex flex-col justify-center items-center mb-4 gap-1">
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className="border-2 p-2"
                    placeholder="دسته بندی جدید"
                />
                <TextError>{message}</TextError>
                <button
                    onClick={handleAddCategory}
                    className="bg-green-700 text-white w-[210px] p-2 rounded-md hover:bg-green-500"
                >
                    ایجاد
                </button>
            </div>
            <div className="flex flex-col p-2 gap-2">
                <h1>دسته بندی ها:</h1>
                {categories.length > 0 ? (
                    categories.map((c) => <AdminCategory getCategories={getCategories} c={c} key={c.id} />)
                ) : (
                    <h1 className="text-center">دسته بندی وجود ندارد</h1>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
