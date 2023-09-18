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
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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
        getCategories();
    }, []);

    const initialValues = {
        title: "",
        body: "",
        categoryId: "",
    };

    const validationSchema = yup.object({
        title: yup.string().required("لطفا عنوان سوال خود را وارد کنید"),
        body: yup.string().required("لطفا متن سوال خود را وارد کنید"),
        categoryId: yup.number("دسته بندی اشتباه است").required("لطفا دسته بندی سوال خود را انتخاب کنید"),
    });

    const handlImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const onSubmit = async ({ title, body, categoryId }) => {
        try {
            const res = await privateAxios.post("/questions", { title, body, categoryId });
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
                            <Field name="categoryId">
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
                            <ErrorMessage name="categoryId" component={TextError} />
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
