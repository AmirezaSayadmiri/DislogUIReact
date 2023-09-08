import { Paper, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import TextError from "../TextError";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const BaseRegister = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const initialValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("ایمیل نامعتبر میباشد")
      .required("لطفا ایمیل خود را وارد کنید"),
    password: yup.string().required("لطفا رمز عبور خود را وارد کنید"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "رمز عبور ها با هم مطابقت ندارند")
      .required("لطفا تاییدیه رمز عبور خود را وارد کنید"),
  });

  const onSubmit = async ({ email, password, confirm_password }) => {
    try {
      const response = await axios.post("/register", {
        email,
        password,
        confirm_password,
      });
      if(response.status===201){
        navigate('/register/activation')
      }
    } catch (err) {
      err.response.data.errors.map((err) => {
        setErrors((prev) => {
          return { ...prev, [err.path]: err.msg };
        });
      });
    }
  };

  return (
    <Paper className="p-8 mx-[20px] md:mx-[300px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Stack direction="column" gap={1} justifyContent="center">
                <h1 className="text-center text-blue-800 mb-2 text-2xl">
                  ثبت نام
                </h1>
                <Field name="email">
                  {({ field }) => {
                    return (
                      <input
                        {...field}
                        className="p-2 rounded-md border border-2"
                        placeholder="ایمیل"
                      />
                    );
                  }}
                </Field>
                <ErrorMessage component={TextError} name="email" />
                <TextError>{errors.email}</TextError>

                <Field name="password">
                  {({ field }) => {
                    return (
                      <input
                        {...field}
                        className="p-2 rounded-md border border-2"
                        placeholder="رمز عبور"
                      />
                    );
                  }}
                </Field>
                <ErrorMessage component={TextError} name="password" />
                <TextError>{errors.password}</TextError>

                <Field name="confirm_password">
                  {({ field }) => {
                    return (
                      <input
                        {...field}
                        className="p-2 rounded-md border border-2"
                        placeholder="تاییدیه رمز عبور"
                      />
                    );
                  }}
                </Field>
                <ErrorMessage component={TextError} name="confirm_password" />
                <TextError>{errors.confirm_password}</TextError>

                <button
                  type="submit"
                  className={`${
                    formik.isValid && !formik.isSubmitting
                      ? "bg-blue-600 hover:bg-blue-400"
                      : "bg-gray-500 hover:bg-gray-400"
                  } py-2 rounded-md text-white transition-all`}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  ثبت نام
                </button>
                <Link
                  to="/login"
                  className="text-blue-800 text-[1rem] mt-4"
                >
                  در دیسلاگ اکانت دارم. ورود
                </Link>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default BaseRegister;
