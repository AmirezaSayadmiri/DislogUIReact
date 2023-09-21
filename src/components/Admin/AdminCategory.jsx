import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import TextError from "../TextError";

const AdminCategory = ({ c, getCategories }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(c.name);
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
            const res = await privateAxios.delete("/categories/" + id);
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "دسته بندی با موفقیت حذف شد", severity: "success" }));
                getCategories();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error",value:"خطایی رخ داد" }));
        }
    };

    const handleUpdate = async () => {
        if(value === c.name) {
            return setMessage("لطفا نام جدیدی انتخاب کنید")
        }
        try {
            const res = await privateAxios.put("/categories/" + c.id, { name: value });
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "دسته بندی با موفقیت ویرایش شد", severity: "success" }));
                getCategories();
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
            <div key={c.id} className="border-2 p-2 bg-blue-50 flex justify-between">
                <h1>{c.name}</h1>
                <div className="flex gap-2">
                    <Edit className="text-yellow-500 cursor-pointer" onClick={() => setOpen(true)} />
                    <Delete className="text-red-500 cursor-pointer" onClick={() => handleDelete(c.id)} />
                </div>
            </div>
        </>
    );
};

export default AdminCategory;
