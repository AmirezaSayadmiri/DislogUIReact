import { Box, Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";

const Ticket = ({ ticket }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #eee",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    };

    return (
        <div className="flex justify-between border-2 bg-blue-50 p-4">
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Paper className="p-10">
                        <p className="text-center">{ticket.answer}</p>
                    </Paper>
                </Box>
            </Modal>
            <div>
                <h1>عنوان: {ticket.title}</h1>
                <p>متن: {ticket.body.slice(0,5)}...</p>
            </div>
            <div className="flex items-center">
                {ticket.is_seen?<h1 className="bg-blue-500 p-1 text-white">دیده شده</h1>:<h1 className="bg-gray-500 p-1 text-white">دیده نشده</h1>}
            </div>
            {ticket.answer&&<Button onClick={()=>setOpen(true)} variant="contained" color="warning">نمایش پاسخ</Button>}
        </div>
    );
};

export default Ticket;
