import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import privateAxios from "../../api/privateAxios";
import TextError from "../TextError";

const AdminTicket = ({ ticket, getTickets }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [answer, setAnswer] = useState(ticket.answer || "");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const [open2, setOpen2] = useState(false);
    const handleClose2 = () => {
        setOpen2(false);
    };

    const style2 = {
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

    const handleAnswer = async () => {
        if (!answer) {
            return setError("لطفا پاسخی وارد کنید");
        }

        try {
            const res = await privateAxios.put("/tickets/" + ticket.id, { answer });
            if (res.status === 200) {
                setOpen(false);
                getTickets();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-between border-2 bg-blue-50 p-4">
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <textarea
                        type="text"
                        className="border-2 p-2 py-4"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="پاسخ"
                    ></textarea>
                    <TextError>{error}</TextError>
                    <Button onClick={handleAnswer} variant="contained">
                        ثبت پاسخ
                    </Button>
                </Box>
            </Modal>
            <Modal open={open2} onClose={handleClose2}>
                <Box sx={style2}>
                    <p>{ticket.answer}</p>
                </Box>
            </Modal>
            <div>
                <h1>عنوان: {ticket.title}</h1>
                <p>متن: {ticket.body}</p>
            </div>
            <div className="flex items-center">
                {ticket.answer ? (
                    <h1 className="bg-blue-500 p-1 text-white">پاسخ داده شده</h1>
                ) : (
                    <h1 className="bg-gray-500 p-1 text-white">پاسخ داده نشده</h1>
                )}
            </div>
            <div className="flex gap-2">
                {ticket.answer && (
                    <Button onClick={() => setOpen2(true)} variant="contained" color="inherit">
                        نمایش پاسخ
                    </Button>
                )}
                <Button onClick={() => setOpen(true)} variant="contained" color="warning">
                    پاسخ دادن
                </Button>
            </div>
        </div>
    );
};

export default AdminTicket;
