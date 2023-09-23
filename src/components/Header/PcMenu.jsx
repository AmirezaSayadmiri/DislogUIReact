import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PcMenu = () => {
    const navigate = useNavigate();

    return (
        <ul className="hidden rounded-md lg:flex  gap-10 text-white">
            <li>
                <Link className="hover:text-blue-200" to="/questions">
                    پرسش ها
                </Link>
            </li>
            <li>
                <Link className="hover:text-blue-200" to="/categories">
                    دسته بندی ها
                </Link>
            </li>
            <li>
                <Link className="hover:text-blue-200" to="/tags">
                    تگ ها
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
