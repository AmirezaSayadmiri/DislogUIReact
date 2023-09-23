import React, { useEffect, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import Ticket from "./Ticket";

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const getTickets = async () => {
        try {
            const res = await privateAxios.get("/tickets/user");
            if (res.status === 200) {
                setTickets(res.data.tickets);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTickets();
    }, []);

    return (
        <div className="p-10 flex flex-col">
            <h1>تیکت های شما:</h1>
            {tickets.length > 0 ? (
                tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)
            ) : (
                <h1 className="text-center">تیکتی وجود ندارد</h1>
            )}
        </div>
    );
};

export default Tickets;
