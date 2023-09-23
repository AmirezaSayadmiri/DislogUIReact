import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Modal } from "@mui/material";
import privateAxios from "../../../api/privateAxios";
const Profile = () => {
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const navigate = useNavigate();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #eee",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    };

    const handleClose1 = () => setOpen1(false);
    const handleClose2 = () => setOpen2(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await privateAxios.get("/profile");
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
            <Modal open={open1} onClose={handleClose1}>
                <Box sx={style}>
                    {profile.Follower?.map((follower) => (
                        <div className="bg-yellow-100 border-2 p-2">
                            <Link to={"/users/" + follower.User.username}>{follower.User.username}</Link>
                        </div>
                    ))}
                </Box>
            </Modal>
            <Modal open={open2} onClose={handleClose2}>
                <Box sx={style}>
                    {profile.Following?.map((following) => (
                        <div className="bg-yellow-100 border-2 p-2">
                            <Link to={"/users/" + following.User.username}>{following.User.username}</Link>
                        </div>
                    ))}
                </Box>
            </Modal>
            <div className="flex justify-center">
                <Avatar
                    sx={{ width: 150, height: 150 }}
                    src={`${profile.image && `http://localhost:8000/${profile.image}`}`}
                />
            </div>
            <h1 className="text-center my-4">{user.username}</h1>

            <div className="flex justify-center items-center gap-2">
                <div
                    onClick={() => profile.Follower.length > 0 && setOpen1(true)}
                    className="cursor-pointer border p-2 bg-yellow-50"
                >
                    {profile.Follower?.length} دنبال کننده
                </div>
                <div
                    onClick={() => profile.Following.length > 0 && setOpen2(true)}
                    className="cursor-pointer border p-2 bg-yellow-50"
                >
                    {profile.Following?.length} دنبال شده
                </div>
            </div>

            <p className="m-5 text-gray-500">بیوگرافی: {profile.bio || "مشخص نشده"}</p>
            <div className="border-2 p-4 py-10 mx-2 flex flex-col gap-2">
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
                                    <li className="bg-gray-200 w-20 text-center my-1 rounded-md py-1" key={skill}>
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
                                    <li className="bg-gray-200 w-20 text-center my-1 rounded-md py-1" key={experience}>
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
