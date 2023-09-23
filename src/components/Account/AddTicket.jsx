import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import TextError from "../TextError";
import { Button, Paper } from "@mui/material";
import privateAxios from "../../api/privateAxios";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
    const initialValues = {
        title: "",
        body: "",
    };

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const validationSchema = yup.object({
        title: yup.string().required("لطفا موضوع سوال خود را وارد کنید"),
        body: yup.string().required("لطفا متن سوال خود را وارد کنید"),
    });

    const onSubmit = async ({ title, body }) => {
        try {
            const res = await privateAxios.post("/tickets", {
                title,
                body,
            });
            if(res.status===200){
                dispatch(showSnackBar({value:"تیکت شما ثبت شد",severity:"success"}))
                navigate("/")
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({value:"خطایی رخ داد",severity:"error"}))
        }
    };

    return (
        <Paper className="p-10 m-10">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="flex  gap-2 flex-col items-center justify-center">
                    <div className="flex flex-col gap-1">
                        <Field name="title" placeholder="موضوع" className="border-2 p-2" />
                        <ErrorMessage name="title" component={TextError} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Field name="body">
                            {({ field }) => {
                                return (
                                    <textarea
                                        {...field}
                                        cols="23"
                                        className="border-2"
                                        placeholder="متن"
                                        rows="10"
                                    ></textarea>
                                );
                            }}
                        </Field>
                        <ErrorMessage name="body" component={TextError} />
                    </div>
                    <Button type="submit" variant="contained" className="w-[215px]">
                        ثبت تیکت
                    </Button>
                </Form>
            </Formik>
        </Paper>
    );
};

export default AddTicket;
