import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import axios from "../../api/axios";
import { Avatar, Button, Icon, Paper } from "@mui/material";
import farvardin from "farvardin";
import { ThumbDownAlt, ThumbUpAlt, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import privateAxios from "../../api/privateAxios";
import AddAnswer from "../Answer/AddAnswer";
import Answer from "../Answer/Answer";

const Question = () => {
    const { slug, id } = useParams();
    const [question, setQuestion] = useState({});
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const getQuestion = async () => {
        try {
            const res = await axios.get("/questions/" + slug + "/" + id);
            if (res.status === 200) {
                setQuestion(res.data.question);
                return res.data.question.id;
            }
        } catch (err) {
            setNotFound(true);
        }
    };

    useEffect(() => {
        const handleUseEffect = async () => {
            const id = await getQuestion();
            handleView(id);
        };
        handleUseEffect();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await privateAxios.post("/questions/" + id + "/view");
            if (res.status === 200) {
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    const handleLike = async () => {
        try {
            const res = await privateAxios.post("/questions/" + question.id + "/like");
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
            const res = await privateAxios.post("/questions/" + question.id + "/dislike");
            if (res.status === 200) {
                dispatch(showSnackBar({ severity: "success", value: res.data.message }));
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    const handleClose = async () => {
        try {
            const res = await privateAxios.post("/questions/" + question.id + "/close");
            if (res.status === 200) {
                dispatch(showSnackBar({ severity: "success", value: res.data.message }));
                getQuestion();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
        }
    };

    if (notFound || !question.id) {
        return <NotFound />;
    }

    return (
        <Paper className="p-10 m-10">
            <div className="bg-blue-100 border-2 p-10">
                <div className="flex justify-end">
                    {question.is_closed ? (
                        <span className="text-gray-400">سوال بسته شده</span>
                    ) :question.UserId==auth.userId && (
                        <Button variant="contained" color="warning" onClick={handleClose}>
                            بستن سوال
                        </Button>
                    )}
                </div>
                <div className="flex flex-col">
                    <h1 className="flex gap-2 text-gray-400">
                        پرسیده شده در
                        <span>
                            {farvardin.gregorianToSolar(
                                new Date(question.createdAt).getFullYear(),
                                new Date(question.createdAt).getMonth() + 1,
                                new Date(question.createdAt).getDate(),
                                "string"
                            )}
                        </span>
                    </h1>
                    <div className="flex gap-1 items-center text-gray-400">
                        تعداد بازدید:
                        <span className="">{question.views}</span>
                    </div>
                    <div className="flex gap-1 items-center text-gray-400">
                        دسته بندی:
                        <span className="">{question.Category.name}</span>
                    </div>
                </div>
                <div className="flex mb-5 justify-end">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-gray-400">{question.likes}</span>
                            <ThumbUpAlt
                                onClick={handleLike}
                                color="success"
                                className="cursor-pointer hover:bg-green-200 transition-all"
                                sx={{ fontSize: "2.5rem" }}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-gray-400">{question.dislikes}</span>
                            <ThumbDownAlt
                                onClick={handleDislike}
                                color="error"
                                className="cursor-pointer hover:bg-red-200 transition-all"
                                sx={{ fontSize: "2.5rem" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar
                        src={
                            question.User.UserProfile.image &&
                            `http://localhost:8000/${question.User.UserProfile.image}`
                        }
                    />
                    <h1>{question.User.username}</h1>
                </div>

                <div className="my-4 flex flex-col justify-center items-center gap-2">
                    <h1 className="text-blue-500 text-2xl">{question.title}</h1>
                    <img src={question.image && `http://localhost:8000/${question.image}`} />
                </div>

                <p className="m-10">{question.body}</p>

                <div className="flex flex-col gap-2">
                    <h1>تگ ها:</h1>
                    <div className="flex gap-1">
                        {question.Tag.map((tag) => (
                            <span
                                key={tag.id}
                                className="border-2 w-[90px] text-center bg-yellow-200 px-2 py-1 text-black"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full">
                {auth.isLoggedIn && !question.is_closed ? (
                    <AddAnswer QuestionId={question.id} getQuestion={getQuestion} />
                ) : auth.isLoggedIn && question.is_closed ? (
                    <div className="bg-gray-300 w-full text-center py-3 border border-black my-2">سوال بسته شده</div>
                ) : (
                    <Link className="flex justify-center text-blue-500 text-2xl hover:text-blue-400" to={"/login"}>
                        برای پاسخ دادن وارد شوید
                    </Link>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {question.Answers.map((answer) => (
                    <Answer key={answer.id} answer={answer} getQuestion={getQuestion} question={question} />
                ))}
            </div>
        </Paper>
    );
};

export default Question;
