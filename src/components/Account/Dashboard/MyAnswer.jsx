import React, { useRef, useState } from "react";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";
import privateAxios from "../../../api/privateAxios";
import { useDispatch } from "react-redux";
import { Box, Button, Modal, Paper } from "@mui/material";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../TextError";

const MyAnswer = ({ answer, getAnswers }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const res = await privateAxios.delete("/answers/" + answer.id);
            if (res.status === 200) {
                getAnswers();
                dispatch(showSnackBar({ severity: "success", value: "پاسخ شما حذف شد" }));
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

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

    return (
        <div className="border-2 bg-yellow-100 p-2 flex items-center justify-between">
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
            <div>
                <h1>{answer.body.slice(0, 4)}...</h1>
            </div>
            <div className="text-gray-700">سوال: {answer.Question.title}</div>
            <div className="flex gap-4 items-center">
                <div>
                    {answer.is_active ? (
                        <h1 className="text-blue-500">منتشر شده</h1>
                    ) : (
                        <h1 className="text-gray-500">در انتظار بررسی ادمین</h1>
                    )}
                </div>
                <div>
                    <Button onClick={() => setOpen(true)} variant="contained" color="warning">
                        ویرایش
                    </Button>
                </div>
                <div>
                    {answer.is_active && (
                        <Button onClick={handleDelete} variant="contained" color="error">
                            حذف
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAnswer;
