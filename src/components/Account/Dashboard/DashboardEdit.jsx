import React, { useEffect, useRef, useState } from "react";
import privateAxios from "../../../api/privateAxios";
import { useNavigate } from "react-router-dom";
import { Avatar, TextField } from "@mui/material";
import axios from "../../../api/axios";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../app/features/snackBar/snackBarSlice";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import * as yup from "yup";
import TextError from "../../TextError";
import { Delete } from "@mui/icons-material";

const DashboardEdit = () => {
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [usernameError, setUsernameError] = useState("");
    const [username, setUsername] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [newSkill, setNewSkill] = useState("");
    const [newExperience, setNewExperience] = useState("");

    const [newProfile, setNewProfile] = useState({
        bio: "",
        age: "",
        gender: "",
        skills: [],
        experiences: [],
    });

    const getUserData = async () => {
        try {
            const res = await privateAxios.get("/profile");
            if (res.status === 200) {
                setUser(res.data.user);
                setProfile(res.data.profile);
                setNewProfile({
                    bio: res.data.profile.bio || "",
                    age: res.data.profile.age || "",
                    gender: res.data.profile.gender || "",
                    skills: res.data.profile.skills?.split(",") || [],
                    experiences: res.data.profile.experiences?.split(",") || [],
                });
                setUsername(res.data.user.username)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handlImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleImageFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);

            try {
                const res = await privateAxios.post("/profile/set-user-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                getUserData();
                inputRef.current.value = "";
                setSelectedImage(null);
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "عکس پروفایل شما با موفقیت تغییر کرد",
                    })
                );
            } catch (err) {
                console.log(err);
                dispatch(
                    showSnackBar({
                        severity: "error",
                        value: "خطایی رخ داد لطفا دوباره امتحان کنید",
                    })
                );
            }
        }
    };

    const handleDeletePofileImage = async () => {
        try {
            const res = await privateAxios.delete("/profile/delete-user-image/");
            if (res.status === 200) {
                getUserData();
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "عکس پروفایل شما با موفقیت حذف شد",
                    })
                );
            }
        } catch (err) {
            console.log(err);
            dispatch(
                showSnackBar({
                    severity: "error",
                    value: "خطایی رخ داد لطفا دوباره امتحان کنید",
                })
            );
        }
    };

    const handleFormSubmit = async () => {
        try {
            const res = await privateAxios.post("/profile", {
                bio: newProfile.bio,
                age: newProfile.age,
                gender: newProfile.gender,
                skills: newProfile.skills.join(","),
                experiences: newProfile.experiences.join(","),
            });
            if (res.status === 200) {
                getUserData();
                dispatch(
                    showSnackBar({
                        severity: "success",
                        value: "تغییرات اعمال شد",
                    })
                );
            }
        } catch (err) {
            console.log(err);
            dispatch(
                showSnackBar({
                    severity: "error",
                    value: "خطایی رخ داد لطفا بعدا امتحان کنید",
                })
            );
        }
    };

    const handleChangeUsername = async () => {
      try{
        const res = await privateAxios.post("/profile/change-username",{
          username
        })

        if(res.status===200){
          dispatch(showSnackBar({severity:"success", value:"نام کاربری شما با موفقیت تغییر کرد"}))
          getUserData()
          setUsernameError("")
        }
      }
      catch(err){
        console.log(err);
        setUsernameError(err.response.data.errors.map(er=>er.msg).join("\n"))
      }
    }

    return (
        <div className="flex flex-col mt-10 lg:mt-0 p-10">
            <div className="flex flex-col items-center justify-center gap-2">
                <Avatar
                    sx={{ width: 150, height: 150 }}
                    src={`${profile.image && `http://localhost:8000/${profile.image}`}`}
                />

                <form className="flex flex-col justify-center items-center gap-1" onSubmit={handleImageFormSubmit}>
                    <input ref={inputRef} onChange={handlImageChange} type="file" className="w-[200px]" />
                    <button
                        className={`border rounded-lg p-2 w-[50%] text-white ${
                            selectedImage ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        disabled={!selectedImage}
                        type="submit"
                    >
                        اعمال تصویر
                    </button>
                </form>
                {profile.image && (
                    <button onClick={handleDeletePofileImage} className="text-red-500">
                        حذف عکس فعلی
                    </button>
                )}
            </div>

            <div className="flex flex-col mt-[100px] justify-center gap-2 items-center my-5">
              <h1>تغییر نام کاربری</h1>
                <input onChange={(e)=>setUsername(e.target.value)} value={username} className="border-2 p-2 rounded-md" type="text" />
                <button onClick={handleChangeUsername} className="bg-blue-500 text-white p-2 rounded-lg w-[210px]">تغییر</button>
                <TextError>{usernameError}</TextError>
            </div>

            <div className="flex mt-10 flex-col justify-center items-center gap-4">
                <h1>تغییر پروفایل</h1>
                <textarea
                    value={newProfile.bio}
                    onChange={(e) => {
                        setNewProfile((prev) => {
                            return { ...prev, bio: e.target.value };
                        });
                    }}
                    type="text"
                    placeholder="بیو"
                    className="border px-4 py-3 rounded-md"
                />

                <input
                    value={newProfile.age}
                    onChange={(e) => {
                        setNewProfile((prev) => {
                            return { ...prev, age: e.target.value };
                        });
                    }}
                    type="text"
                    placeholder="سن"
                    className="border px-4 py-3 rounded-md"
                />

                <select
                    className="border px-4 py-3 rounded-md w-[200px]"
                    value={newProfile.gender}
                    onChange={(e) => {
                        if (e.target.value === "male" || e.target.value === "female" || e.target.value === "") {
                            setNewProfile((prev) => {
                                return { ...prev, gender: e.target.value };
                            });
                        }
                    }}
                >
                    <option value="">تعیین جنسیت...</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                </select>

                <input
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newSkill}
                    type="text"
                    className="border px-4 py-3 rounded-md"
                    placeholder="مهارت جدید"
                />
                <button
                    onClick={() => {
                        if (newSkill) {
                            setNewProfile((prev) => {
                                return { ...prev, skills: [...prev.skills, newSkill] };
                            });
                            setNewSkill("");
                        }
                    }}
                    className="bg-green-800 w-[200px] text-white py-2 rounded-md"
                >
                    +
                </button>
                <ul className="flex flex-col gap-2">
                    {newProfile.skills.map((skill) => (
                        <li
                            className="text-gray-600 bg-gray-100 border w-[200px] py-1 text-center flex justify-between px-4"
                            key={skill}
                        >
                            <span>{skill}</span>
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    const skills = newProfile.skills.filter((skilll) => skilll !== skill);
                                    setNewProfile((prev) => {
                                        return { ...prev, skills: skills };
                                    });
                                }}
                            >
                                <Delete />
                            </button>
                        </li>
                    ))}
                </ul>

                <input
                    onChange={(e) => setNewExperience(e.target.value)}
                    value={newExperience}
                    type="text"
                    className="border px-4 py-3 rounded-md"
                    placeholder="تجربه جدید"
                />
                <button
                    onClick={() => {
                        if (newExperience) {
                            setNewProfile((prev) => {
                                return {
                                    ...prev,
                                    experiences: [...prev.experiences, newExperience],
                                };
                            });
                            setNewExperience("");
                        }
                    }}
                    className="bg-green-800 w-[200px] text-white py-2 rounded-md"
                >
                    +
                </button>
                <ul className="flex flex-col gap-2">
                    {newProfile.experiences.map((experience) => (
                        <li
                            className="text-gray-600 bg-gray-100 border w-[200px] py-1 text-center flex justify-between px-4"
                            key={experience}
                        >
                            <span>{experience}</span>
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    const experiences = newProfile.experiences.filter(
                                        (experiencee) => experiencee !== experience
                                    );
                                    setNewProfile((prev) => {
                                        return { ...prev, experiences: experiences };
                                    });
                                }}
                            >
                                <Delete />
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleFormSubmit} className="bg-blue-900 text-white w-[200px] rounded-sm p-2">
                    ذخیره تغییرات
                </button>
            </div>
        </div>
    );
};

export default DashboardEdit;
