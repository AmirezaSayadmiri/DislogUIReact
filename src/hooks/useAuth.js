import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access");
    const storedRefreshToken = localStorage.getItem("refresh");
  }, []);

  const login = (user, userId, access, refresh) => {
    dispatch(setAuth({ user, userId, refresh, access, isLoggedIn: true }));

    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", userId);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return {login,logout}
};

export default useAuth;
