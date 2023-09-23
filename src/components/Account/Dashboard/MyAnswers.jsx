import React, { useEffect, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";
import MyAnswer from "./MyAnswer";

const MyAnswers = () => {
    const dispatch = useDispatch();

    const [answers, setAnswers] = useState([]);

    const getAnswers = async () => {
        try {
            const res = await privateAxios.get("/profile/answers");
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
        <div className="flex flex-col gap-2 p-10 my-10">
            {answers.length > 0 ? (
                answers.map((answer) => <MyAnswer key={answer.id} answer={answer} getAnswers={getAnswers} />)
            ) : (
                <h1 className="text-center">شما هنوز پرسشی ثبت نکردید</h1>
            )}
        </div>
    );
};

export default MyAnswers;
