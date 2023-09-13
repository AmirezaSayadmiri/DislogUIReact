import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import TextError from "../../TextError";
import * as yup from "yup";
import privateAxios from "../../../api/privateAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    new_password: "",
    confirm_password: "",
  };
  const validationSchema = yup.object({
    password: yup.string().required("لطفا رمز عبور فعلی خود را وارد کنید"),
    new_password: yup.string().required("لطفا رمز عبور جدید خود را وارد کنید"),
    confirm_password: yup
      .string()
      .oneOf(
        [null, yup.ref("new_password")],
        "رمز عبور های جدید با هم مطابقت ندارند"
      )
      .required("لطفا تاییدیه رمز عبور جدید خود را وارد کنید"),
  });

  const onSubmit = async ({ password, new_password, confirm_password }) => {
    try {
      const res = await privateAxios.post("/profile/new-password", {
        password,
        new_password,
        confirm_password,
      });

      if (res.status === 200) {
        dispatch(
          showSnackBar({
            severity: "succcess",
            value: "رمز عبور شما با موفقیت تغییر کرد",
          })
        );

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      const value = err.response.data.errors.map(error=>error.msg)

      dispatch(
        showSnackBar({
          severity: "error",
          value: value.join("\n"),
        })
      );
    }
  };

  return (
    <div className="mt-10 lg:mt-0 p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col gap-1">
            <Field
              name="password"
              className="border-2 p-2 rounded-md"
              placeholder="رمز عبور فعلی"
            />
            <ErrorMessage component={TextError} name="password" />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              name="new_password"
              className="border-2 p-2 rounded-md"
              placeholder="رمز عبور جدید"
            />
            <ErrorMessage component={TextError} name="new_password" />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              name="confirm_password"
              className="border-2 p-2 rounded-md"
              placeholder="تاییدیه رمز عبور جدید"
            />
            <ErrorMessage component={TextError} name="confirm_password" />
          </div>

          <button className="bg-blue-950 text-white w-[210px] py-2 transition-all hover:bg-blue-900">
            تغییر رمز عبور
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
