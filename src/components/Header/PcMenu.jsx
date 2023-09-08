import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PcMenu = () => {
  const navigate = useNavigate();

  const [openPcMenu, setOpenPcMenu] = useState(false);
  const handleOpenPcMenu = () => setOpenPcMenu(true);
  const handleClosePcMenu = () => setOpenPcMenu(false);

  return (
    <ul className="hidden rounded-md lg:flex  gap-10 text-white">
      <li
        className="relative"
        onMouseEnter={handleOpenPcMenu}
        onMouseLeave={handleClosePcMenu}
      >
        <Link className="hover:text-blue-200" to="/">
          پرسش ها <ExpandMore />
        </Link>
        <div className="absolute w-[200px] opacity-0 h-[20px]"></div>
        <ul
          className={`${
            openPcMenu
              ? "flex flex-col items-center pointer-events-auto translate-y-4"
              : "opacity-0 pointer-events-none translate-y-[-10px]"
          } transition-transform absolute w-[200px] bg-slate-800`}
        >
          <li
            onClick={() => navigate("/")}
            className="hover:bg-slate-950 w-full cursor-pointer text-center py-4 group"
          >
            همه
          </li>
          <li
            onClick={() => navigate("/")}
            className="hover:bg-slate-950 w-[200px] cursor-pointer text-center py-4 group"
          >
            فرانت اند
          </li>
          <li
            onClick={() => navigate("/")}
            className="hover:bg-slate-950 w-[200px] cursor-pointer text-center py-4 group"
          >
            بک اند
          </li>
          <li
            onClick={() => navigate("/")}
            className="hover:bg-slate-950 w-[200px] cursor-pointer text-center py-4 group"
          >
            موبایل
          </li>
          <li
            onClick={() => navigate("/")}
            className="hover:bg-slate-950 w-[200px] cursor-pointer text-center py-4 group"
          >
            هک و امنیت
          </li>
        </ul>
      </li>
      <li>
        <Link className="hover:text-blue-200" to="/">
          مقالات
        </Link>
      </li>
      <li>
        <Link className="hover:text-blue-200" to="/">
          درباره ما{" "}
        </Link>
      </li>
      <li>
        <Link className="hover:text-blue-200" to="/">
          تماس با ما
        </Link>
      </li>
    </ul>
  );
};

export default PcMenu;
