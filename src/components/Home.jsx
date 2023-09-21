import React, { useEffect, useState } from "react";
import privateAxios from "../api/privateAxios";
import { Avatar, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "../api/axios";
import QuestionItem from "./Question/QuestionItem";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState();
    const [seach, setSearch] = useSearchParams();

    const [questions, setQuestions] = useState([]);
    const [bestUsers, setBestUsers] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await axios.get("/questions/latest");
                if (res.status === 200) {
                    setQuestions(res.data.questions);
                    const res2 = await axios.get("/users/best");
                    if (res2.status === 200) {
                        setBestUsers(res2.data.users);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getQuestions();
    }, []);

    const handleSearch = (e) => {
        setSearch((prev) => {
            return { ...prev, q: e.target.value };
        });
    };

    const handleSubmitSearch = async () => {
        if (seach.get("q")) {
            navigate("/questions/?q=" + seach.get("q") + "&page=1");
        }
    };

    return (
        <div className="m-10">
            <div className="flex justify-center items-center">
                <input
                    value={seach.get("q")}
                    onChange={handleSearch}
                    className="px-10 text-black py-2"
                    type="text"
                    placeholder="جستجو..."
                />
                <div
                    onClick={handleSubmitSearch}
                    className="border cursor-pointer hover:bg-blue-900 px-4 py-[7px] bg-blue-950 rounded-l-xl"
                >
                    <Search className="text-white" />
                </div>
            </div>

            <div className="flex items-center justify-start">
                <Button variant="contained" href="/ask-question" color="success">
                    ایجاد سوال
                </Button>
            </div>

            <div className="my-10 flex flex-col gap-2">
                <div className="flex justify-between m-4">
                    <h1 className="text-white">آخرین پرسش ها</h1>
                    <Link to={"/questions"} className="text-white underline">
                        دیدن همه
                    </Link>
                </div>
                {questions.length > 0 ? (
                    questions.map((question) => <QuestionItem key={question.id} question={question} />)
                ) : (
                    <h1 className="text-center text-white">پرسشی بر اساس فیتلر های شما پیدا نشد</h1>
                )}
            </div>

            <div className="my-10 flex flex-col gap-2">
                <div className="flex m-4">
                    <h1 className="text-white">بهترین کاربران</h1>
                </div>
                {bestUsers.length > 0 && bestUsers.map(user=>(
                    <div key={user.id} className="flex text-white items-center gap-2 bg-gray-600 p-2 rounded-md">
                        <Avatar src={user.UserProfile.image && `http://localhost:8000/${user.UserProfile.image}`} />
                        <h1>{user.username}</h1>
                        <h1>امتیاز: <span className="text-yellow-400">{user.UserProfile.score}</span></h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
