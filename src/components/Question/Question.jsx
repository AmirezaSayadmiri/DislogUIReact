import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import axios from "../../api/axios";
import { Avatar, Icon, Paper } from "@mui/material";
import farvardin from "farvardin";
import { ThumbDownAlt, ThumbUpAlt, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import privateAxios from "../../api/privateAxios";
import AddAnswer from "../Answer/AddAnswer";
import Answer from "../Answer/Answer";

const Question = () => {
    const { slug } = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [profile, setProfile] = useState({});
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const getQuestion = async () => {
        try {
            const res = await axios.get("/questions/" + slug);
            if (res.status === 200) {
                setQuestion(res.data.question);
                setProfile(res.data.profile);
                setAnswers(res.data.answers);
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

    if (notFound || !question.id) {
        return <NotFound />;
    }

    return (
        <Paper className="p-10 m-10">
            <div>
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
                    <Avatar src={profile.image && `http://localhost:8000/${profile.image}`} />
                    <h1>{question.title}</h1>
                </div>

                <div className="my-4 flex justify-center">
                    <img src={question.image && `http://localhost:8000/${question.image}`} />
                </div>

                <p className="m-10">{question.body}</p>
            </div>

            <div className="w-full">
                {auth.isLoggedIn ? (
                    <AddAnswer QuestionId={question.id} />
                ) : (
                    <Link className="flex justify-center text-blue-500 text-2xl hover:text-blue-400" to={"/login"}>
                        برای پاسخ دادن وارد شوید
                    </Link>
                )}
            </div>
            
            {answers.map(answer=>(
                <Answer answer={answer} />
            ))}
        </Paper>
    );
};

export default Question;
