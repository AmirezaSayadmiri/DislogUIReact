import { AccountCircle, Edit, Settings } from "@mui/icons-material";
import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <Container className="my-10">
      <div className="grid grid-cols-12 lg:gap-2">
        <div className="col-span-12 lg:col-span-5">
          <Paper>
            <ul>
              <li
                onClick={() => navigate("/")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/">خانه</Link>
              </li>
              <li
                onClick={() => navigate("/admin/categories")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/categories"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/categories">دسته بندی ها</Link>
              </li>
              <li
                onClick={() => navigate("/admin/tags")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/tags"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/tags">تگ ها</Link>
              </li>
              <li
                onClick={() => navigate("/admin/questions")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/questions"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/questions">پرسش ها</Link>
              </li>
              <li
                onClick={() => navigate("/admin/answers")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/answers"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/answers">پاسخ ها</Link>
              </li>
              <li
                onClick={() => navigate("/admin/users")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/users"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/users">کاربران</Link>
              </li>
              <li
                onClick={() => navigate("/admin/tickets")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/admin/tickets"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/admin/tickets">تیکت ها</Link>
              </li>
            </ul>
          </Paper>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Paper>
            <Outlet />
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default Admin;
