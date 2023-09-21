import { Check, Star, ThumbDownAlt, ThumbUpAlt } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import farvardin from "farvardin";
import React from "react";
import privateAxios from "../../api/privateAxios";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";

const Answer = ({ answer, getQuestion, question }) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            const res = await privateAxios.post("/answers/" + answer.id + "/like");
            if (res.status === 200) {
                dispatch(showSnackBar({ severity: "success", value: res.data.message }));
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    const handleSelect = async () => {
        try {
            const res = await privateAxios.post("/answers/" + answer.id + "/select");
            if (res.status === 200) {
                dispatch(showSnackBar({ severity: "success", value: res.data.message }));
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    const handleDislike = async () => {
        try {
            const res = await privateAxios.post("/answers/" + answer.id + "/dislike");
            if (res.status === 200) {
                dispatch(showSnackBar({ severity: "success", value: res.data.message }));
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    return (
        <div className="border-2 p-10 bg-yellow-100">
            {answer.is_selected && (
                <div className="flex justify-end mb-10">
                    <Check className="bg-blue-600 rounded-full text-white" color="inherit" sx={{ fontSize: "3rem" }} />
                </div>
            )}

            <div className="flex justify-end">
                {auth.userId == question.UserId && answer.UserId != auth.userId && (
                    <Button variant="contained" color="success" onClick={handleSelect}>
                        انتخاب به عنوان بهترین پاسخ
                    </Button>
                )}
            </div>
            <div className="flex flex-col">
                <h1 className="flex gap-2 text-gray-400">
                    پاسخ داده شده در
                    <span>
                        {farvardin.gregorianToSolar(
                            new Date(answer.createdAt).getFullYear(),
                            new Date(answer.createdAt).getMonth() + 1,
                            new Date(answer.createdAt).getDate(),
                            "string"
                        )}
                    </span>
                </h1>
            </div>
            <div className="flex mb-5 justify-end">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-gray-400">{answer.likes}</span>
                        <ThumbUpAlt
                            onClick={handleLike}
                            color="action"
                            className="cursor-pointer hover:bg-green-200 transition-all"
                            sx={{ fontSize: "2.5rem" }}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-gray-400">{answer.dislikes}</span>
                        <ThumbDownAlt
                            onClick={handleDislike}
                            color="action"
                            className="cursor-pointer hover:bg-red-200 transition-all"
                            sx={{ fontSize: "2.5rem" }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Avatar
                    src={answer.User.UserProfile.image && `http://localhost:8000/${answer.User.UserProfile.image}`}
                />
                <h1>{answer.User.username}</h1>
            </div>

            <div className="my-4 flex justify-center">
                <img src={answer.image && `http://localhost:8000/${answer.image}`} />
            </div>

            <p className="m-10">{answer.body}</p>
        </div>
    );
};

export default Answer;
