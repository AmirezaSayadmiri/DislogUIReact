import React, { useEffect, useRef, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import { Box, Button, Modal, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextError from "../../TextError";

const MyQuestion = ({ question, getQuestions }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const res = await privateAxios.delete("/questions/" + question.id);
            if (res.status === 200) {
                getQuestions();
                dispatch(showSnackBar({ severity: "success", value: "پرسش شما حذف شد" }));
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    const [open, setOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(question.Tag.map((t) => t.id));
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tagsError, setTagsError] = useState("");
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const getCategories = async () => {
        try {
            const res = await privateAxios.get("/categories");
            if (res.status === 200) {
                setCategories(res.data.categories);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getTags = async () => {
        try {
            const res = await privateAxios.get("/tags");
            if (res.status === 200) {
                setTags(res.data.tags);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCategories();
        getTags();
    }, []);

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
        title: question.title,
        body: question.body,
        CategoryId: `${question.CategoryId}`,
    };

    const validationSchema = yup.object({
        title: yup.string().required("لطفا عنوان سوال خود را وارد کنید"),
        body: yup.string().required("لطفا متن سوال خود را وارد کنید"),
        CategoryId: yup.number("دسته بندی اشتباه است").required("لطفا دسته بندی سوال خود را انتخاب کنید"),
    });

    const handlImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const onSubmit = async ({ title, body, CategoryId }) => {
        console.log("");
        if (selectedTags.length < 2) {
            return setTagsError("لطفا حداقل دو تگ انتخاب کنید");
        }
        try {
            const res = await privateAxios.put("/questions/" + question.id, {
                title,
                body,
                CategoryId,
                tags: selectedTags,
            });
            if (res.status === 200) {
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "سوال شما  ویرایش شد",
                    })
                );
                getQuestions();
                setOpen(false);
                if (selectedImage) {
                    const formData = new FormData();
                    formData.append("image", selectedImage);
                    try {
                        const res2 = await privateAxios.post(`/questions/${res.data.questionId}/image`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                        if (res2.status === 200) {
                            getQuestions();
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

    const handleSelectTag = (id) => {
        const tag = selectedTags.find((tag) => tag == id);
        if (tag) {
            setSelectedTags((prev) => prev.filter((t) => t != id));
        } else {
            setSelectedTags((prev) => [...prev, id]);
        }
    };

    const handleDeleteImage = async () => {
        try {
            const res = await privateAxios.delete("/questions/" + question.id + "/image");
            if (res.status === 200) {
                showSnackBar({
                    severity: "success",
                    value: "تصویر سوال حذف شد",
                });
                setOpen(false);
                getQuestions();
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
                        <h1 className="text-blue-500 text-2xl">ویرایش سوال</h1>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form className="flex flex-col gap-2 md:w-[300px]">
                                <div>
                                    <Field
                                        name="title"
                                        className="border-2 w-full p-2 rounded-md"
                                        placeholder="عنوان"
                                    />
                                    <ErrorMessage name="title" component={TextError} />
                                </div>

                                <div>
                                    <Field name="body">
                                        {({ field }) => {
                                            return (
                                                <textarea
                                                    {...field}
                                                    className="border-2 p-2 rounded-md w-full"
                                                    placeholder="متن"
                                                    id=""
                                                    cols="21"
                                                    rows="10"
                                                ></textarea>
                                            );
                                        }}
                                    </Field>
                                    <ErrorMessage name="body" component={TextError} />
                                </div>

                                <div>
                                    <Field name="CategoryId">
                                        {({ field }) => {
                                            return (
                                                <select className="border-2 p-2 w-full" {...field} id="">
                                                    <option value="">دسته بندی سوال...</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            );
                                        }}
                                    </Field>
                                    <ErrorMessage name="CategoryId" component={TextError} />
                                </div>

                                <div className="flex flex-col gap-2 my-3">
                                    <label htmlFor="">تگ ها:</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {tags.map((tag) => (
                                            <div
                                                onClick={() => handleSelectTag(tag.id)}
                                                key={tag.id}
                                                className={`border transition-all border-black cursor-pointer p-2 rounded-lg ${
                                                    selectedTags.find((t) => t == tag.id)
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                            >
                                                {tag.name}
                                            </div>
                                        ))}
                                    </div>
                                    <TextError>{tagsError}</TextError>
                                </div>

                                <div className="">
                                    <label htmlFor="">تصویر</label>
                                    {question.image && (
                                        <div className="flex flex-col gap-4 my-4">
                                            <img width="100%" src={`http://localhost:8000/${question.image}`} alt="" />
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
                <h1>{question.title}</h1>
                <h1>{question.body.slice(0, 4)}...</h1>
            </div>
            <div className="flex gap-2 items-center">
                <div>
                    {question.is_active ? (
                        <h1 className="text-blue-500">منتشر شده</h1>
                    ) : (
                        <h1 className="text-gray-500">در انتظار بررسی ادمین</h1>
                    )}
                </div>
                <div>
                    <Button variant="contained" onClick={()=>setOpen(true)} color="warning">ویرایش</Button>
                </div>
                <div>
                    {question.is_active && (
                        <Button onClick={() => handleDelete(question.id)} variant="contained" color="error">
                            حذف
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyQuestion;
