import { Button, Container, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { Outlet } from "react-router-dom";

const Register = () => {
  return (
    <Container sx={{ marginY: "80px" }}>
      <Outlet />
    </Container>
  );
};

export default Register;
