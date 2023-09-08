import {
  AlertTitle,
  Container,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import TextError from "../TextError";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Activation = () => {
  const { login, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [inp3, setInp3] = useState("");
  const [inp4, setInp4] = useState("");
  const [inp5, setInp5] = useState("");
  const [inp6, setInp6] = useState("");
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const handleCodeEntering = (e, setInp, nextRef, prevRef) => {
    if (!isNaN(+e.target.value)) {
      setInp(e.target.value);
      if (e.target.value) {
        nextRef.current.focus();
      } else {
        prevRef.current.focus();
      }
    }
  };
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        severity="success"
        elevation={6}
        ref={ref}
        variant="standard"
        {...props}
      />
    );
  });

  useEffect(() => {
    if (inp1 && inp2 && inp3 && inp4 && inp5) {
      const activation_code = `${inp1}${inp2}${inp3}${inp4}${inp5}${inp6}`;
      const postData = async () => {
        try {
          const {
            status,
            data: { userId, user, access, refresh },
          } = await axios.post("/register/activation", { activation_code });
          if (status === 200) {
            setOpenSnackBar(true);
            login(user, userId, access, refresh);
            setTimeout(() => {
              navigate("/account/dashboard");
            }, 2000);
          }
        } catch (err) {
          console.log(err)
          setError(
            err.response.status === 400
              ? "کد وارد شده اشتباه میباشد"
              : err.response.data.message
          );
        }
      };
      postData();
    }
  }, [inp5]);

  return (
    <Container sx={{ marginY: "80px" }}>
      <Snackbar
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        autoHideDuration={2000}
      >
        <Alert onClose={handleCloseSnackBar}>
          <h1>اکانت شما با موفقیت ساخته شد</h1>
        </Alert>
      </Snackbar>

      <Paper className="p-10">
        <Stack direction="column">
          <h1 className="text-blue-900 text-center my-5 xl:text-2xl">
            کد تایید فرستاده شده به ایمیل خود را وارد کنید
          </h1>
          <Stack
            sx={{ direction: "rtl" }}
            direction="row"
            justifyContent="center"
            gap={1}
          >
            <input
              dir="ltr"
              ref={ref1}
              value={inp1}
              onInput={(e) => handleCodeEntering(e, setInp1, ref2, ref1)}
              maxLength={1}
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px] text-center text-2xl rounded-lg border border-2 border-blue-900 text-blue-900"
              type="text"
            />
            <input
              dir="ltr"
              ref={ref2}
              value={inp2}
              onInput={(e) => handleCodeEntering(e, setInp2, ref3, ref1)}
              maxLength={1}
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px] text-center text-2xl rounded-lg border border-2 border-blue-900 text-blue-900"
              type="text"
            />
            <input
              dir="ltr"
              ref={ref3}
              value={inp3}
              onInput={(e) => handleCodeEntering(e, setInp3, ref4, ref2)}
              maxLength={1}
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px] text-center text-2xl rounded-lg border border-2 border-blue-900 text-blue-900"
              type="text"
            />
            <input
              dir="ltr"
              ref={ref4}
              value={inp4}
              onInput={(e) => handleCodeEntering(e, setInp4, ref5, ref3)}
              maxLength={1}
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px] text-center text-2xl rounded-lg border border-2 border-blue-900 text-blue-900"
              type="text"
            />
            <input
              dir="ltr"
              ref={ref5}
              value={inp5}
              onInput={(e) => handleCodeEntering(e, setInp5, ref5, ref4)}
              maxLength={1}
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px] text-center text-2xl rounded-lg border border-2 border-blue-900 text-blue-900"
              type="text"
            />
          </Stack>
          <div className="my-2 text-center">
            <TextError>{error}</TextError>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Activation;
