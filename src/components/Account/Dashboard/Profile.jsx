import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import privateAxios from "../../../api/privateAxios";
const Profile = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await privateAxios.post("/profile");
        if (res.status === 200) {
          setUser(res.data.user);
          setProfile(res.data.profile);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="mt-10 lg:mt-0 py-10">
      <div className="flex justify-center">
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={`${profile.image && `http://localhost:8000/${profile.image}`}`}
        />
      </div>
      <h1 className="text-center my-4">{user.username}</h1>
      <p className="m-5 text-gray-500">
        بیوگرافی: {profile.bio || "مشخص نشده"}
      </p>
      <div className="border border-2 p-4 py-10 mx-2 flex flex-col gap-2">
        <h1>ایمیل : {user.email}</h1>
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
  );
};

export default Profile;
