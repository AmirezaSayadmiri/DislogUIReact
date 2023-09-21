import React, { useEffect, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import QuestionItem from "../../Question/QuestionItem";
import { Avatar } from "@mui/material";

const Activity = () => {
    const [likedQuestions, setLikedQuestions] = useState([]);
    const [dislikedQuestions, setDislikedQuestions] = useState([]);
    const [viewedQuestions, setViewedQuestions] = useState([]);

    const getLikedQuestions = async () => {
        try {
            const res = await privateAxios.get("/profile/liked-questions");
            if (res.status === 200) {
                setLikedQuestions(res.data.questions);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getDislikedQuestions = async () => {
        try {
            const res = await privateAxios.get("/profile/disliked-questions");
            if (res.status === 200) {
                setDislikedQuestions(res.data.questions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getViewedQuestions = async () => {
        try {
            const res = await privateAxios.get("/profile/viewed-questions");
            if (res.status === 200) {
                setViewedQuestions(res.data.questions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getLikedQuestions();
        getDislikedQuestions();
        getViewedQuestions();
    }, []);

    return (
        <div className="flex flex-col p-10 my-10 gap-10">
            <div className="flex flex-col gap-2">
                <h1 className="bg-blue-600 text-white p-2">سوالات لایک شده:</h1>
                {likedQuestions.map((q) => (
                    <QuestionItem key={q.id} question={q} />
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="bg-red-600 text-white p-2">سوالات دیسلایک شده:</h1>
                {dislikedQuestions.map((q) => (
                    <QuestionItem key={q.id} question={q} />
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="bg-gray-600 text-white p-2">سوالات دیده شده:</h1>
                {viewedQuestions.map((q) => (
                    <QuestionItem key={q.id} question={q} />
                ))}
            </div>
        </div>
    );
};

export default Activity;
