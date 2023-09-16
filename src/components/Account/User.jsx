import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { Avatar, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import privateAxios from "../../api/privateAxios";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";

const User = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const { username } = useParams();

  const getUser = async () => {
    try {
      const res = await axios.get("/users/" + username);
      if (res.status === 200) {
        setUser(res.data.user);
        setProfile(res.data.profile);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        navigate("/notfound");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const followHandler = async () => {
    try {
      const res = await privateAxios.post(
        "/users/" + user.username + "/follow"
      );
      if (res.status === 200) {
        await getUser();
        dispatch(
          showSnackBar({
            severity: "success",
            value: "کاربر مورد نظر با موفقیت دنبال شد",
          })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا بعدا امتجان کنید" }));
    }
  };

  const unfollowHandler = async () => {
    try {
      const res = await privateAxios.post(
        "/users/" + user.username + "/unfollow"
      );
      if (res.status === 200) {
        getUser();
        dispatch(
          showSnackBar({
            severity: "success",
            value: "کاربر مورد نظر با موفقیت آنفالو شد",
          })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا بعدا امتجان کنید" }));
    }
  };

  return (
    <Paper className="p-10 m-10">
      <div className="mt-10 lg:mt-0 py-10">
        <div className="flex justify-center">
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={`${profile.image && `http://localhost:8000/${profile.image}`}`}
          />
        </div>
        <h1 className="text-center my-4">{user.username}</h1>
        <div className="flex flex-col items-center justify-center gap-2">
          {auth.isLoggedIn && profile.Follower?.find((f) => f.userId == auth.userId) ? (
            <Button onClick={unfollowHandler} variant="contained" color="error">
              لغو دنبال کردن
            </Button>
          ) : auth.isLoggedIn? (
            <Button onClick={followHandler} variant="contained">
              دنبال کردن
            </Button>
          ):<Link className="text-blue-600" to={"/login"}>برای دنبال کردن کاربر لطفا وارد شوید</Link>}
        </div>
        <p className="m-5 text-gray-500">
          بیوگرافی: {profile.bio || "مشخص نشده"}
        </p>
        <div className="border-2 p-4 py-10 mx-2 flex flex-col gap-2">
          <h1>جنسیت : {profile.gender || "مشخص نشده"}</h1>
          <h1>سن : {profile.age || "مشخص نشده"}</h1>
          <h1>جنسیت : {profile.gender || "مشخص نشده"}</h1>
          <h1 className="text-yellow-600">امتیاز : {profile.score}</h1>
          <div>
            {profile.skills ? (
              <>
                <h1>مهارت ها:</h1>
                <ul>
                  {profile.skills.split(",").map((skill) => (
                    <li
                      className="bg-gray-200 w-20 text-center my-1 rounded-md py-1"
                      key={skill}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <h1>مهارت ها: مشخص نشده</h1>
            )}
          </div>
          <div className="mt-4">
            {profile.experiences ? (
              <>
                <h1>سابقه کار ها:</h1>
                <ul>
                  {profile.experiences.split(",").map((experience) => (
                    <li
                      className="bg-gray-200 w-20 text-center my-1 rounded-md py-1"
                      key={experience}
                    >
                      {experience}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <h1>سابقه کار: مشخص نشده</h1>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default User;
