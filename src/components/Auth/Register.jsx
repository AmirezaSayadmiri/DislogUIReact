import { Button, Container, Stack, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import TextError from "../TextError";
import { Outlet } from "react-router-dom";

const Register = () => {
  return (
    <Container sx={{ marginY: "80px" }}>
      <Outlet />
    </Container>
  );
};

export default Register;
