import { Container, Paper, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import TextError from "../TextError";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email_username: "",
    password: "",
  });

  const initialValues = {
    email_username: "",
    password: "",
  };

  const validationSchema = yup.object({
    email_username: yup
      .string()
      .required("لطفا ایمیل یا نام کاربری خود را وارد کنید"),
    password: yup.string().required("لطفا رمز عبور خود را وارد کنید"),
  });

  const onSubmit = async ({ email_username, password }) => {
    try {
      const response = await axios.post("/login", {
        email_username,
        password,
      });
      if (response.status === 200) {
        const {
          data: { user, userId, access, refresh },
        } = response;
        dispatch(
          showSnackBar({
            value: "در حال ورود...",
            severity: "success",
          })
        );

        login(user, userId, access, refresh);
        navigate("/");
      }
    } catch (err) {
      if (!err.response.data.message) {
        err.response.data.errors.map((err) => {
          setErrors((prev) => {
            return { ...prev, [err.path]: err.msg };
          });
        });
      } else {
        setErrors((prev) => {
          return { ...prev, message: err.response.data.message };
        });
      }
    }
  };

  return (
    <Container className="my-[100px]">
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
                    ورود
                  </h1>
                  <Field name="email_username">
                    {({ field }) => {
                      return (
                        <input
                          {...field}
                          className="p-2 rounded-md border border-2"
                          placeholder="نام کاربری یا ایمیل"
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage component={TextError} name="email_username" />
                  <TextError>{errors.email_username}</TextError>

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
                  <TextError>{errors.message ? errors.message : ""}</TextError>
                  <button
                    type="submit"
                    className={`${
                      formik.isValid && !formik.isSubmitting
                        ? "bg-blue-600 hover:bg-blue-400"
                        : "bg-gray-500 hover:bg-gray-400"
                    } py-2 rounded-md text-white transition-all`}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    ورود
                  </button>
                  <Link
                    to="/reset-password"
                    className="text-blue-800 text-[1rem] mt-4"
                  >
                    رمز عبورم را فراموش کرده ام
                  </Link>
                  <Link
                    to="/register"
                    className="text-blue-800 text-[1rem] mt-1"
                  >
                    ثبت نام در دیسلاگ
                  </Link>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
