import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import { Button, Paper } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../TextError";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsError, setTagsError] = useState("");
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategoriesAndTags = async () => {
            try {
                const res = await privateAxios.get("/categories");
                if (res.status === 200) {
                    setCategories(res.data.categories);
                }
                const res2 = await privateAxios.get("/tags");
                if (res2.status === 200) {
                    setTags(res2.data.tags);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getCategoriesAndTags();
    }, []);

    const initialValues = {
        title: "",
        body: "",
        CategoryId: "",
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
        if (selectedTags.length < 2) {
            return setTagsError("لطفا حداقل دو تگ انتخاب کنید");
        }
        try {
            const res = await privateAxios.post("/questions", { title, body, CategoryId, tags: selectedTags });
            if (res.status === 201) {
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "سوال شما  ثبت شد",
                    })
                );
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
                            navigate("/");
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

    return (
        <div className="p-10">
            <Paper className="p-10 lg:mx-10 flex flex-col justify-center items-center gap-4">
                <h1 className="text-blue-500 text-2xl">ثبت سوال </h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form className="flex flex-col gap-2 md:w-[300px]">
                        <div>
                            <Field name="title" className="border-2 w-full p-2 rounded-md" placeholder="عنوان" />
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
                            <div className="flex gap-2">
                                {tags.map((tag) => (
                                    <div
                                        onClick={() => handleSelectTag(tag.id)}
                                        key={tag.id}
                                        className={`border transition-all border-black cursor-pointer p-2 rounded-lg ${
                                            selectedTags.find((t) => t == tag.id) ? "bg-blue-500 text-white" : ""
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
                            <input
                                onChange={handlImageChange}
                                type="file"
                                className="border-2 w-full rounded-md p-2"
                                ref={fileInputRef}
                                name=""
                                id=""
                            />
                        </div>

                        <Button type="submit" variant="contained" color="success">
                            ثبت
                        </Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
    );
};

export default AddQuestion;
