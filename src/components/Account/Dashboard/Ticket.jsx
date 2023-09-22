import React from "react";

const Ticket = ({ ticket }) => {
    return (
        <div className="flex justify-between border-2 bg-blue-50 p-4">
            <div>
                <h1>عنوان: {ticket.title}</h1>
                <p>متن: {ticket.body}</p>
            </div>
            <div className="flex items-center">
                {ticket.is_seen?<h1 className="bg-blue-500 p-1 text-white">دیده شده</h1>:<h1 className="bg-gray-500 p-1 text-white">دیده نشده</h1>}
            </div>
            {ticket.answer&&<p>{ticket.answer}</p>}
        </div>
    );
};

export default Ticket;
