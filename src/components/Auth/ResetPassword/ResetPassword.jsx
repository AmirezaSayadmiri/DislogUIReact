import { Container, Paper, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import TextError from "../../TextError";
import axios from "../../../api/axios";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
  });
  const [succesMessage, setSuccessMessage] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("ایمیل معتبر نیست")
      .required("لطفا ایمیل خود را وارد کنید"),
  });

  const onSubmit = async ({ email }) => {
    try {
      const response = await axios.post("/reset-password", {
        email,
      });
      setSuccessMessage(response.data.message);
      setErrors({})
    } catch (err) {
      err.response.data.errors.map((err) => {
        setErrors((prev) => {
          return { ...prev, [err.path]: err.msg };
        });
      });
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
                    بازیابی رمز عبور
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
                  <h1 className="text-green-700">{succesMessage}</h1>

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
                    بازیابی
                  </button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
