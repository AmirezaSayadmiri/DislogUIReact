import { AccountCircle, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Drawer, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileDrawer = ({ openMobileDrawer, handleCloseMobileDrawer, handleOpenMobileDrawer }) => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const { isLoggedIn,user } = useSelector((state) => state.auth);

    const handleMobileMenu = () => setOpenMobileMenu(openMobileMenu ? false : true);

    return (
        <Drawer anchor="left" open={openMobileDrawer} onClose={handleCloseMobileDrawer}>
            <Box textAlign="center" width={"60vw"} className="bg-slate-950 text-white" minHeight={"130vh"}>
                <Stack direction="column" gap={5}>
                    <Stack className="p-5 flex flex-col gap-10">
                        <Typography variant="h5" component="h5">
                            دیسلاگ
                        </Typography>
                        <Stack gap={1}>
                            {isLoggedIn ? (
                                <>
                                    <Button variant="contained" href="/dashboard" startIcon={<AccountCircle />}>
                                        داشبورد
                                    </Button>
                                    {user.role==="admin" &&(
                                    <Button variant="contained" href="/admin" color="warning">
                                        پنل ادمین
                                    </Button>

                                    )}
                                    <Button variant="contained" href="/add-ticket" color="success">
                                        ارسال تیکت
                                    </Button>
                                    <Button variant="outlined" href="/logout" color="error">
                                        خروج
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outlined" href="/login">
                                        ورود
                                    </Button>
                                    <Button variant="contained" href="/register">
                                        ثبت نام
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Stack>

                    <Stack>
                        <List disablePadding>
                            <ListItem disableGutters className="flex flex-col cursor-pointer">
                                <Box className="flex flex-row justify-center gap-1">
                                    <Link onClick={handleCloseMobileDrawer} to={"/questions"} stlye={{ marginLeft: "20px" }}>
                                        پرسش ها
                                    </Link>
                                </Box>
                            </ListItem>

                            <ListItem disableGutters className="flex flex-col cursor-pointer">
                                <Box className="flex flex-row justify-center gap-1">
                                    <Link onClick={handleCloseMobileDrawer} to={"/categories"} stlye={{ marginLeft: "20px" }}>
                                        دسته بندی ها
                                    </Link>
                                </Box>
                            </ListItem>

                            <ListItem disableGutters className="flex flex-col cursor-pointer">
                                <Box className="flex flex-row justify-center gap-1">
                                    <Link onClick={handleCloseMobileDrawer} to={"/tags"} stlye={{ marginLeft: "20px" }}>
                                        تگ ها
                                    </Link>
                                </Box>
                            </ListItem>

                  
                        </List>
                    </Stack>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default MobileDrawer;
