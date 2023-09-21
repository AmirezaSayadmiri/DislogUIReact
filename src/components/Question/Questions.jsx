import React, { useEffect, useState } from "react";
import { Button, Pagination, PaginationItem, Paper } from "@mui/material";
import { ArrowBack, ArrowForward, Edit, Search, Tune } from "@mui/icons-material";
import QuestionItem from "./QuestionItem";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";

const Questions = () => {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(true);
    const [search, setSearch] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [text, setText] = useState(search.get("q") ? "نتایج جستجو:" : "همه پرسش ها");

    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(null);

    const getQuestions = async () => {
        try {
            const res = await axios.get(`/questions/?page=${search.get("page")}`);
            if (res.status === 200) {
                setQuestions(res.data.questions);
                setCount(res.data.count);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (!search.get("page")) {
            const newSearch = new URLSearchParams(search);
            newSearch.set("page", 1);
            setSearch(newSearch);
        }
        if (!search.get("order")) {
            const newSearch = new URLSearchParams(search);
            newSearch.set("order", "dateD");
            setSearch(newSearch);
        }
        handleFilter();
        const getCategories = async () => {
            try {
                const res2 = await axios.get("/categories");
                if (res2.status === 200) {
                    setCategories(res2.data.categories);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getCategories();
    }, []);

    const handleSearch = (e) => {
        const newSearch = new URLSearchParams(search);
        newSearch.set("q", e.target.value);
        newSearch.set("page", 1);
        setSearch(newSearch);
    };

    useEffect(() => {
        handleFilter();
    }, [search]);

    const handleFilter = async () => {
        const URL = `/questions/?page=${search.get("page") || 1}&q=${search.get("q") || ""}&order=${
            search.get("order") || "dateD"
        }${search.getAll("categories").map((c) => "&categories=" + c)}`
            .replace(",", "")
            .replace(",", "");
        console.log(URL);
        try {
            const res = await axios.get(URL);
            if (res.status === 200) {
                setQuestions(res.data.questions);
                setCount(res.data.count);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="m-10">
            <div className="flex justify-center items-center">
                <input
                    value={search.get("q")}
                    onChange={handleSearch}
                    className="px-10 text-black py-2"
                    type="text"
                    placeholder="جستجو..."
                />
                <div
                    onClick={handleFilter}
                    className="border cursor-pointer hover:bg-blue-900 px-4 py-[7px] bg-blue-950 rounded-l-xl"
                >
                    <Search className="text-white" />
                </div>
            </div>

            <div onClick={() => setShowFilter(!showFilter)} className="text-white flex justify-end mx-10 mt-10">
                <Tune className="border rounded-md hover:bg-blue-800 cursor-pointer" sx={{ fontSize: "3rem" }} />
            </div>

            <div className="my-4 mx-10">
                <Paper
                    className={`${
                        !showFilter ? "h-0" : "h-auto p-10"
                    } transition-all overflow-hidden flex flex-col gap-2`}
                >
                    <h1>فیلتر بر اساس دسته بندی:</h1>
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <span
                                className={`border cursor-pointer p-2 ${
                                    search.getAll("categories").find((c) => c == category.id)
                                        ? "bg-blue-500 text-white"
                                        : "border-black"
                                }`}
                                onClick={() => {
                                    const newSearch = new URLSearchParams(search);
                                    let allSelectedCategories = newSearch.getAll("categories");
                                    const hasCategory = allSelectedCategories.find((c) => c == category.id);
                                    newSearch.set("page", 1);
                                    if (hasCategory) {
                                        const filteredCategories = allSelectedCategories.filter(
                                            (c) => c != category.id
                                        );
                                        newSearch.delete("categories");
                                        if (filteredCategories.length > 0) {
                                            filteredCategories.forEach((c) => newSearch.append("categories", c));
                                        }

                                        setSearch(newSearch);
                                    } else {
                                        newSearch.append("categories", category.id);
                                        setSearch(newSearch);
                                    }
                                }}
                                key={category.id}
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                </Paper>
            </div>

            <div className="mb-10 flex flex-col gap-2">
                <div className="flex justify-between m-4">
                    <h1 className="text-white">{text}</h1>

                    <select
                        value={search.get("order")}
                        onChange={(e) => {
                            const newSearch = new URLSearchParams(search);
                            newSearch.set("order", e.target.value);
                            newSearch.set("page", 1);
                            setSearch(newSearch);
                        }}
                        className="px-2 py-1 border outline-none"
                    >
                        <option value="dateD">جدید ترین</option>
                        <option value="date">قدیمی ترین</option>
                        <option value="close">بسته شده</option>
                        <option value="open">بسته نشده</option>
                    </select>
                </div>
                {questions.length > 0 ? (
                    questions.map((question) => <QuestionItem key={question.id} question={question} />)
                ) : (
                    <h1 className="text-center text-white">پرسشی بر اساس فیتلر های شما پیدا نشد</h1>
                )}
            </div>

            {questions.length > 0 && count > 5 && (
                <div className="flex justify-center items-center gap-2">
                    <div
                        onClick={() => {
                            if (1 < +search.get("page")) {
                                const newSearch = new URLSearchParams(search);
                                newSearch.set("page", +search.get("page") - 1);
                                setSearch(newSearch);
                            }
                        }}
                        className="border cursor-pointer p-[7px] rounded-full"
                    >
                        <ArrowForward className="text-white" />
                    </div>
                    {Array.from({ length: Math.ceil(count / 5) }, (_, index) => index + 1).map((p) => (
                        <div
                            key={p.toString()}
                            className={`rounded-full cursor-pointer px-4 py-2  text-white ${
                                search.get("page") == p.toString()
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 hover:bg-gray-500"
                            }`}
                            onClick={() => {
                                const newSearch = new URLSearchParams(search);
                                newSearch.set("page", p.toString());
                                setSearch(newSearch);
                            }}
                        >
                            {p.toString()}
                        </div>
                    ))}
                    <div
                        onClick={() => {
                            if (Math.ceil(count / 5) > +search.get("page")) {
                                const newSearch = new URLSearchParams(search);
                                newSearch.set("page", +search.get("page") + 1);
                                setSearch(newSearch);
                            }
                        }}
                        className="border cursor-pointer p-[7px] rounded-full"
                    >
                        <ArrowBack className="text-white" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions;
