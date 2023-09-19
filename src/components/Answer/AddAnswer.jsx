import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import { Button, Paper } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../TextError";
import { useNavigate } from "react-router-dom";

const AddAnswer = ({ QuestionId, getQuestion }) => {
    const fileInputRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        body: "",
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
            const res = await privateAxios.post("/answers", { body, QuestionId });
            if (res.status === 201) {
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "پاسخ شما  ثبت شد",
                    })
                );
                if (selectedImage) {
                    const formData = new FormData();
                    formData.append("image", selectedImage);
                    try {
                        const res2 = await privateAxios.post(`/answers/${res.data.answerId}/image`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                        if(res2.status===200){
                            getQuestion()
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
                }else{
                    getQuestion()
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
        <div className="p-10 flex flex-col items-center justify-center gap-2 w-full">
            <h1 className="text-2xl">ثبت پاسخ </h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="flex flex-col gap-2 w-full">
                    <div>
                        <Field name="body">
                            {({ field }) => {
                                return (
                                    <textarea
                                        {...field}
                                        className="border-2 p-2 rounded-md w-full"
                                        placeholder="متن پاسخ"
                                        id=""
                                        cols="21"
                                        rows="10"
                                    ></textarea>
                                );
                            }}
                        </Field>
                        <ErrorMessage name="body" component={TextError} />
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

                    <Button type="submit" variant="contained" color="primary">
                        ثبت پاسخ
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddAnswer;
