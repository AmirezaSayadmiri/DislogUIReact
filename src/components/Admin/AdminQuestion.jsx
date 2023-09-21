import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Modal, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import privateAxios from "../../api/privateAxios";
import TextError from "../TextError";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const AdminQuestion = ({ q, getQuestions, tags, categories }) => {
    const [open, setOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(q.Tag.map((t) => t.id));
    const [tagsError, setTagsError] = useState("");
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
            const res = await privateAxios.delete("/questions/" + q.id);
            console.log(res);
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "پرسش با موفقیت حذف شد", severity: "success" }));
                getQuestions();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    const handleUpdate = async () => {};

    const initialValues = {
        title: q.title,
        body: q.body,
        CategoryId: `${q.CategoryId}`,
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
            const res = await privateAxios.put("/questions/" + q.id, { title, body, CategoryId, tags: selectedTags });
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
                } else {
                    navigate("/");
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
        try{
            const res = await privateAxios.delete("/questions/"+q.id+"/image");
            if(res.status===200){
                showSnackBar({
                    severity: "success",
                    value:"تصویر سوال حذف شد"
                })
                setOpen(false)
                getQuestions()
            }
        }catch(err){
            console.log(err);
        }
    };

    return (
        <>
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
                                    {q.image && (
                                        <div className="flex flex-col gap-4 my-4">
                                            <img width="100%" src={`http://localhost:8000/${q.image}`} alt="" />
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
            <div className="border-2 p-3 bg-blue-50 flex justify-between">
                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center">
                        <Avatar src={q.User.UserProfile.image && `http://localhost:8000/${q.User.UserProfile.image}`} />
                        <h1>{q.User.username}</h1>
                    </div>
                    <Link to={`/questions/${q.slug}/${q.id}`} className="text-blue-500">
                        {q.title}
                    </Link>
                    <h1 className="text-gray-400">{q.body}...</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <Edit className="text-yellow-500 cursor-pointer" onClick={() => setOpen(true)} />
                    <Delete className="text-red-500 cursor-pointer" onClick={handleDelete} />
                </div>
            </div>
        </>
    );
};

export default AdminQuestion;
