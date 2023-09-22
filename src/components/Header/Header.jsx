import { AccountCircle, ArrowRight, ExpandMore, Login, Menu } from "@mui/icons-material";
import {
    Accordion,
    AccordionSummary,
    AppBar,
    Box,
    Button,
    Collapse,
    Container,
    Drawer,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Menu as Menuu,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import PcMenu from "./PcMenu";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
    const handleCloseMobileDrawer = () => setOpenMobileDrawer(false);
    const handleOpenMobileDrawer = () => setOpenMobileDrawer(true);
    const handleCloseAccountMenu = () => setAnchorEl(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openAccountMenu = Boolean(anchorEl);

    return (
        <Container className="mt-3">
            <AppBar position="static" sx={{ bgcolor: "rgb(14,35,66)" }}>
                <Toolbar className="flex justify-between">
                    <MobileDrawer
                        openMobileDrawer={openMobileDrawer}
                        handleCloseMobileDrawer={handleCloseMobileDrawer}
                        handleOpenMobileDrawer={handleOpenMobileDrawer}
                    />
                    <Button sx={{ display: { lg: "none" } }} color="inherit" onClick={handleOpenMobileDrawer}>
                        <Menu fontSize="large" />
                    </Button>

                    <Link to="/" variant="h5" component="h5">
                        دیسلاگ
                    </Link>

                    <PcMenu />

                    <div className="flex gap-2">
                        <button onClick={(e) => setAnchorEl(e.currentTarget)} className="py-1 px-3 text-2xl">
                            <AccountCircle sx={{ fontSize: "35px" }} />
                        </button>
                        <Menuu open={openAccountMenu} onClose={handleCloseAccountMenu} anchorEl={anchorEl}>
                            <div className="px-2 flex flex-col gap-1">
                                {isLoggedIn ? (
                                    <>
                                        <Button
                                            className="w-full"
                                            variant="contained"
                                            href="/dashboard"
                                            startIcon={<AccountCircle />}
                                        >
                                            داشبورد
                                        </Button>
                                        {user.role === "admin" && (
                                            <Button variant="contained" color="warning" href="/admin">
                                                پنل ادمین
                                            </Button>
                                        )}
                                        <Button variant="contained" href="/add-ticket" color="success">
                                            ارسال تیکت
                                        </Button>
                                        <Button className="w-full" variant="contained" color="error" href="/logout">
                                            خروج
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button href="/register" variant="contained">
                                            ثبت نام
                                        </Button>
                                        <Button href="/login" variant="outlined">
                                            ورود
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Menuu>
                    </div>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default Header;
