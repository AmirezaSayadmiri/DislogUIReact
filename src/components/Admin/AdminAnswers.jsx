import React, { useEffect, useState } from "react";
import privateAxios from "../../api/privateAxios";
import { Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AdminAnswer from "./AdminAnswer";

const AdminAnswers = () => {
    const [answers, setAnswers] = useState([]);

    const getAnswers = async () => {
        try {
            const res = await privateAxios.get("/answers");
            if (res.status === 200) {
                setAnswers(res.data.answers);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <div className="p-10 my-10 gap-2 flex flex-col">
            {answers.map((answer) => (
                <AdminAnswer key={answer.id} getAnswers={getAnswers} answer={answer} />
            ))}
        </div>
    );
};

export default AdminAnswers;
