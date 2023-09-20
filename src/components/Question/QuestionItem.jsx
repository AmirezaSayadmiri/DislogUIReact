import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const QuestionItem = ({ question }) => {
    let date;
    const timeDifference = new Date().getTime() - new Date(question.createdAt).getTime();
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;

    if (timeDifference < minute) {
        date = "چند لحظه پیش";
    } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        date = `${minutes} دقیقه پیش`;
    } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        date = `${hours} ساعت پیش`;
    } else if (timeDifference < week) {
        const days = Math.floor(timeDifference / day);
        date = `${days} روز پیش`;
    } else if (timeDifference < month) {
        const weeks = Math.floor(timeDifference / week);
        date = `${weeks} هفته پیش`;
    } else if (timeDifference < month) {
        const months = Math.floor(timeDifference / month);
        date = `${months} ماه پیش`;
    }else{
        const years = Math.floor(timeDifference / year);
        date = `${years} سال پیش`;
    }

    return (
        <div className="border p-4 bg-yellow-100  rounded-md">
            <div className="text-gray-600 mb-3 flex flex-col">
                <span>{date}</span>
                <span>{question.views} بازدید</span>
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col justify-center items-center gap-1">
                    <Avatar
                        src={
                            question.User.UserProfile.image &&
                            `http://localhost:8000/${question.User.UserProfile.image}`
                        }
                    />
                    <span className="text-gray-500">{question.User.username}</span>
                </div>
                <Link to={`/questions/${question.slug}/${question.id}`} className="text-black hover:text-gray-500">
                    {question.title}
                </Link>
                <span className="text-[10px]">{question.body.slice(0, 10)}...</span>
            </div>
        </div>
    );
};

export default QuestionItem;
