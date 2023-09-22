import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import TextError from "../TextError";

const AdminTag = ({ t, getTags }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(t.name);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

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

    const handleDelete = async (id) => {
        try {
            const res = await privateAxios.delete("/tags/" + id);
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "تگ با موفقیت حذف شد", severity: "success" }));
                getTags();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    const handleUpdate = async () => {
        if (value === t.name) {
            return setMessage("لطفا نام جدیدی انتخاب کنید");
        }
        try {
            const res = await privateAxios.put("/tags/" + t.id, { name: value });
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "تگ با موفقیت ویرایش شد", severity: "success" }));
                getTags();
                setOpen(false);
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response.data.errors.map((errr) => errr.msg));
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="border-2 p-2"
                        type="text"
                    />
                    <TextError>{message}</TextError>
                    <Button onClick={handleUpdate} variant="contained" color="warning">
                        ویرایش
                    </Button>
                </Box>
            </Modal>
            <div key={t.id} className="border-2 p-2 bg-blue-50 flex justify-between">
                <h1>{t.name}</h1>
                <div className="flex gap-2">
                    <div
                        className="cursor-pointer border-2 p-1 border-gray-400 hover:bg-gray-300"
                        onClick={() => setOpen(true)}
                    >
                        <Edit className="text-yellow-500 cursor-pointer" />
                    </div>
                    <div
                        className="cursor-pointer border-2 p-1 border-gray-400 hover:bg-gray-300"
                        onClick={() => handleDelete(t.id)}
                    >
                        <Delete className="text-red-500 cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTag;
