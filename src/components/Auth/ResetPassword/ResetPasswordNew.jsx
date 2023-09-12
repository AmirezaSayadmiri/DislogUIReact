import { Container, Paper, Snackbar, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { forwardRef, useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import TextError from "../../TextError";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";

const ResetPasswordNew = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        {...props}
        ref={ref}
        severity="success"
        color="success"
        variant="standard"
      />
    );
  });
  const { token: reset_password_token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    password: "",
    reset_password_token: "",
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const initialValues = {
    password: "",
  };

  const validationSchema = yup.object({
    password: yup.string().required("لطفا رمز عبور جدید خود را وارد کنید"),
  });

  const onSubmit = async ({ password }) => {
    try {
      const response = await axios.post("/reset-password/new", {
        password,
        reset_password_token,
      });
      setOpenSnackBar(true);
      setTimeout(()=>{
          navigate("/login");
      },2000)
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
        <Snackbar
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          autoHideDuration={2000}
        >
          <Alert onClose={handleCloseSnackBar}>
            رمز عبور شما با موفقیت تغیر کرد
          </Alert>
        </Snackbar>
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
                    تعیین رمز عبور جدید
                  </h1>
                  <Field name="password">
                    {({ field }) => {
                      return (
                        <input
                          {...field}
                          className="p-2 rounded-md border border-2"
                          placeholder="رمز عبور جدید"
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage component={TextError} name="password" />
                  <TextError>{errors.password}</TextError>

                  <TextError>{errors.reset_password_token}</TextError>
                  <button
                    type="submit"
                    className={`${
                      formik.isValid && !formik.isSubmitting
                        ? "bg-blue-600 hover:bg-blue-400"
                        : "bg-gray-500 hover:bg-gray-400"
                    } py-2 rounded-md text-white transition-all`}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    تغییر
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

export default ResetPasswordNew;
