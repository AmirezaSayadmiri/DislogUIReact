import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Category, Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import TextError from "../TextError";
import { Button, Modal } from "@mui/material";
import AdminCategory from "./AdminCategory";
import AdminQuestion from "./AdminQuestion";

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();

    const getQuestions = async () => {
        try {
            const res = await privateAxios.get("/questions/all");
            if (res.status === 200) {
                setQuestions(res.data.questions);
            }
        } catch (err) {
            console.log(err);
        }
    };
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
        getQuestions();
        getCategories();
        getTags();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="p-10 flex flex-col gap-2">
            <div className="flex flex-col justify-center items-center mb-4 gap-1"></div>
            <div className="flex flex-col p-2 gap-2">
                <h1>پرسش ها:</h1>
                {questions.map((q) => (
                    <AdminQuestion tags={tags} categories={categories} getQuestions={getQuestions} q={q} key={q.id} />
                ))}
            </div>
        </div>
    );
};

export default AdminQuestions;
