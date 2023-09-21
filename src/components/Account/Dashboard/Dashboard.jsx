import { AccountCircle, Edit, Settings } from "@mui/icons-material";
import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <Container className="my-10">
      <div className="grid grid-cols-12 lg:gap-2">
        <div className="col-span-12 lg:col-span-5">
          <Paper>
            <ul>
              <li
                onClick={() => navigate("/dashboard")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard"?"bg-blue-950 text-white":""}`}
              >
                <AccountCircle />
                <Link to="/dashboard">پروفایل</Link>
              </li>
              <li
                onClick={() => navigate("/dashboard/edit")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard/edit"?"bg-blue-950 text-white":""}`}
              >
                <Settings />
                <Link to="/dashboard/edit">ویرایش</Link>
              </li>
              <li
                onClick={() => navigate("/dashboard/change-password")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard/change-password"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/dashboard">تغییر رمز عبور</Link>
              </li>
              <li
                onClick={() => navigate("/dashboard/activity")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard/change-password"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/dashboard">فعالیت</Link>
              </li>
              <li
                onClick={() => navigate("/dashboard/messages")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard/messages"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/dashboard">پیام ها</Link>
              </li>
              <li
                onClick={() => navigate("/dashboard/tickets")}
                className={`text-center flex justify-center gap-1 py-4 border border-2 transition-all hover:bg-blue-950 hover:text-white ${location.pathname==="/dashboard/tickets"?"bg-blue-950 text-white":""}`}
              >
                <Link to="/dashboard">تیکت ها</Link>
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

export default Dashboard;
