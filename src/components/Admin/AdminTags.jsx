import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Category, Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import TextError from "../TextError";
import { Modal } from "@mui/material";
import AdminTag from "./AdminTag";

const AdminTags = () => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTags = async () => {
        try {
            const res = await axios.get("/tags");
            if (res.status === 200) {
                setTags(res.data.tags);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTags();
    }, []);

    const handleAddTag = async () => {
        try {
            const res = await privateAxios.post("/tags", {
                name: tag,
            });
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "تگ با موفقیت ساخته شد", severity: "success" }));
                getTags();
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
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    className="border-2 p-2"
                    placeholder="تگ جدید"
                />
                <TextError>{message}</TextError>
                <button
                    onClick={handleAddTag}
                    className="bg-green-700 text-white w-[210px] p-2 rounded-md hover:bg-green-500"
                >
                    ایجاد
                </button>
            </div>
            <div className="flex flex-col p-2 gap-2">
                <h1>تگ ها:</h1>
                {tags.map((t) => (
                    <AdminTag getTags={getTags} t={t} key={t.id} />
                ))}
            </div>
        </div>
    );
};

export default AdminTags;
