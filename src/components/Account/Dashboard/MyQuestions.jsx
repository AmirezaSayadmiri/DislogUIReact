import React, { useEffect, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";
import MyQuestion from "./MyQuestion";

const MyQuestions = () => {
    const dispatch = useDispatch();

    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const res = await privateAxios.get("/profile/questions");
            if (res.status === 200) {
                setQuestions(res.data.questions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div className="flex flex-col gap-2 p-10 my-10">
            {questions.length > 0 ? (
                questions.map((question) => (
                    <MyQuestion key={question.id} question={question} getQuestions={getQuestions} />
                ))
            ) : (
                <h1 className="text-center">شما هنوز پرسشی ثبت نکردید</h1>
            )}
        </div>
    );
};

export default MyQuestions;
