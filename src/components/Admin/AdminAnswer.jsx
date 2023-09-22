import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Modal, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../TextError";

const AdminAnswer = ({ answer, getAnswers }) => {
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleDelete = async () => {
        try {
            const res = await privateAxios.delete("/answers/" + answer.id);
            console.log(res);
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "پاسخ با موفقیت حذف شد", severity: "success" }));
                getAnswers();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };
    const initialValues = {
        body: answer.body,
    };

    const validationSchema = yup.object({
        body: yup.string().required("لطفا متن سوال خود را وارد کنید"),
    });

    const handlImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const onSubmit = async ({ body }) => {
        try {
            const res = await privateAxios.put("/answers/" + answer.id, { body });
            if (res.status === 200) {
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "پاسخ شما  ویرایش شد",
                    })
                );
                getAnswers();
                setOpen(false);
                if (selectedImage) {
                    const formData = new FormData();
                    formData.append("image", selectedImage);

                    const res2 = await privateAxios.post(`/answers/${res.data.answerId}/image`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if (res2.status === 200) {
                        getAnswers();
                    }
                }
            }
        } catch (err) {
            console.log(err);
            dispatch(
                showSnackBar({
                    severity: "error",
                    value:
                        err.response.data.errors.map((error) => error.msg).join("\n") +
                        "\n" +
                        err.response.data.message,
                })
            );
        }
    };
    const handleDeleteImage = async () => {
        try {
            const res = await privateAxios.delete("/answers/" + answer.id + "/image");
            if (res.status === 200) {
                showSnackBar({
                    severity: "success",
                    value: "تصویر پاسخ حذف شد",
                });
                setOpen(false);
                getAnswers();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleActiveAnswer = async () => {
        try {
            const res = await privateAxios.post("/answers/" + answer.id + "/active");
            if (res.status === 200) {
                showSnackBar({
                    severity: "success",
                    value: "عملیات انجام شد",
                });
                getAnswers();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Paper className="p-10 lg:mx-10 flex flex-col justify-center items-center gap-4">
                        <h1 className="text-blue-500 text-2xl">ویرایش پاسخ</h1>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form className="flex flex-col gap-2 md:w-[300px]">
                                <div>
                                    <Field name="body" className="border-2 w-full p-2 rounded-md" placeholder="متن" />
                                    <ErrorMessage name="body" component={TextError} />
                                </div>

                                <div className="">
                                    <label htmlFor="">تصویر</label>
                                    {answer.image && (
                                        <div className="flex flex-col gap-4 my-4">
                                            <img width="100%" src={`http://localhost:8000/${answer.image}`} alt="" />
                                            <Button onClick={handleDeleteImage} variant="outlined" color="error">
                                                حذف تصویر فعلی
                                            </Button>
                                        </div>
                                    )}
                                    <input
                                        onChange={handlImageChange}
                                        type="file"
                                        className="border-2 w-full rounded-md p-2"
                                        ref={fileInputRef}
                                        name=""
                                        id=""
                                    />
                                </div>
                                <Button type="submit" variant="contained" color="warning">
                                    ویرایش
                                </Button>
                            </Form>
                        </Formik>
                    </Paper>
                </Box>
            </Modal>
            <div key={answer.id} className="flex border-2 p-2 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar
                        src={answer.User.UserProfile.image && `http://localhost:8000/${answer.User.UserProfile.image}`}
                    />
                    <h1>{answer.User.username}</h1>
                </div>
                <h1>{answer.body}</h1>
                <div className="flex gap-1">
                    <div>
                        {answer.is_active ? (
                            <Button onClick={handleActiveAnswer} variant="contained" color="warning">
                                غیر فعال کردن
                            </Button>
                        ) : (
                            <Button onClick={handleActiveAnswer} variant="contained">
                                فعال کردن
                            </Button>
                        )}
                    </div>
                    <div
                        onClick={() => setOpen(true)}
                        className="cursor-pointer border-2 p-1 border-gray-400 hover:bg-gray-300"
                    >
                        <Edit className="text-yellow-500" />
                    </div>
                    <div
                        onClick={handleDelete}
                        className="cursor-pointer border-2 p-1 border-gray-400 hover:bg-gray-300"
                    >
                        <Delete className="text-red-500" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAnswer;
