import React, { forwardRef, useEffect } from "react";
import Header from "./components/Header/Header";
import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import BaseRegister from "./components/Auth/Register/BaseRegister";
import Activation from "./components/Auth/Register/Activation";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./app/features/auth/authSlice";
import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import IsAuth from "./components/Auth/IsAuth";
import ResetPasswordNew from "./components/Auth/ResetPassword/ResetPasswordNew";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { hideSnackBar } from "./app/features/snackBar/snackBarSlice";
import Dashboard from "./components/Account/Dashboard/Dashboard";
import Profile from "./components/Account/Dashboard/Profile";
import DashboardEdit from "./components/Account/Dashboard/DashboardEdit";
import ChangePassword from "./components/Account/Dashboard/ChangePassword";
import User from "./components/Account/User";
import NotFound from "./components/NotFound";
import AddQuestion from "./components/Question/AddQuestion";

const GlobalStyles = createGlobalStyle`
body{
  background-image: linear-gradient(180deg, rgba(19,46,85,1) 35%, rgba(14,35,66,1) 100%);
  min-height:100vh;
}
`;

const App = () => {
    const dispatch = useDispatch();
    const snackBar = useSelector((state) => state.snackBar);

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

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
    });

    return (
        <>
            <GlobalStyles />
            <Snackbar open={snackBar.open} onClose={() => dispatch(hideSnackBar())} autoHideDuration={2000}>
                <Alert severity={snackBar.severity} onClose={() => dispatch(hideSnackBar())}>
                    <h1>{snackBar.value}</h1>
                </Alert>
            </Snackbar>
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

                <Route
                    path="dashboard"
                    element={
                        <IsAuth guest={false}>
                            <Dashboard />
                        </IsAuth>
                    }
                >
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<DashboardEdit />} />
                    <Route path="change-password" element={<ChangePassword />} />
                </Route>

                <Route path="users/:username" element={<User />} />
                
                <Route
                    path="ask-question"
                    element={
                        <IsAuth guest={false}>
                            <AddQuestion />
                        </IsAuth>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
