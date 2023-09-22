import React, { useEffect, useState } from "react";
import privateAxios from "../../api/privateAxios";
import { Avatar, Button } from "@mui/material";
import { showSnackBar } from "../../app/features/snackBar/snackBarSlice";
import { useDispatch } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            const res = await privateAxios.get("/users");
            if (res.status === 200) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await privateAxios.delete("/users/" + id);
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "کاربر با موفقیت حذف شد", severity: "success" }));
                getUsers();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    const handleActiveUser = async (id) => {
        try {
            const res = await privateAxios.post("/users/" + id+"/active");
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "عملیات انجام شد", severity: "success" }));
                getUsers();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    const handleAccessUser = async (id) => {
        try {
            const res = await privateAxios.post("/users/" + id+"/access");
            if (res.status === 200) {
                dispatch(showSnackBar({ value: "عملیات انجام شد", severity: "success" }));
                getUsers();
            }
        } catch (err) {
            console.log(err);
            dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد" }));
        }
    };

    return (
        <div className="p-10 flex flex-col">
            {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center border-2 p-2 bg-blue-50">
                    <div className="flex items-center gap-2">
                        <Avatar src={user.UserProfile.image && `http://localhost:8000/${user.UserProfile.image}`} />
                        <div>
                            <h1>{user.email}</h1>
                            <h1>{user.username}</h1>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {user.role==="ordinary" ? (
                            <Button onClick={()=>handleAccessUser(user.id)} variant="contained" color="warning">
                                ادمین کردن
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={()=>handleAccessUser(user.id)}>
                                کابر معمولی کردن
                            </Button>
                        )}
                        {user.is_active ? (
                            <Button onClick={()=>handleActiveUser(user.id)} variant="contained" color="warning">
                                غیر فعال کردن
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={()=>handleActiveUser(user.id)}>
                                فعال کردن
                            </Button>
                        )}
                        <div
                            className="cursor-pointer border-2 p-1 border-gray-400 hover:bg-gray-300"
                            onClick={() => handleDelete(user.id)}
                        >
                            <Delete className="text-red-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;
