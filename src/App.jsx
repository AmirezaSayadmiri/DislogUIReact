import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import BaseRegister from "./components/Auth/BaseRegister";
import Activation from "./components/Auth/Activation";
import { useDispatch } from "react-redux";
import { setAuth } from "./app/features/auth/authSlice";
import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import ResetPassword from "./components/Auth/ResetPassword";
import IsAuth from "./components/Auth/IsAuth";
import ResetPasswordNew from "./components/Auth/ResetPasswordNew";

const GlobalStyles = createGlobalStyle`
body{
  background-image: linear-gradient(180deg, rgba(19,46,85,1) 35%, rgba(14,35,66,1) 100%);
  min-height:100vh;
}
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const access = localStorage.getItem("access");
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn, user, userId, access, refresh }));
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <IsAuth guest={true}>
              <Register />
            </IsAuth>
          }
        >
          <Route index element={<BaseRegister />} />
          <Route path="activation" element={<Activation />} />
        </Route>
        <Route
          path="login"
          element={
            <IsAuth guest={true}>
              <Login />
            </IsAuth>
          }
        />
        <Route
          path="logout"
          element={
            <IsAuth guest={false}>
              <Logout />
            </IsAuth>
          }
        />
        <Route
          path="reset-password"
          element={
            <IsAuth guest={true}>
              <ResetPassword />
            </IsAuth>
          }
        />
        <Route
          path="reset-password/new/:token"
          element={
            <IsAuth guest={true}>
              <ResetPasswordNew />
            </IsAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
