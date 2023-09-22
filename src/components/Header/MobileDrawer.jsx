import { AccountCircle, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MobileDrawer = ({
  openMobileDrawer,
  handleCloseMobileDrawer,
  handleOpenMobileDrawer,
}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleMobileMenu = () =>
    setOpenMobileMenu(openMobileMenu ? false : true);

  return (
    <Drawer
      anchor="left"
      open={openMobileDrawer}
      onClose={handleCloseMobileDrawer}
    >
      <Box
        textAlign="center"
        width={"60vw"}
        className="bg-slate-950 text-white"
        minHeight={"130vh"}
      >
        <Stack direction="column" gap={5}>
          <Stack className="p-5 flex flex-col gap-10">
            <Typography variant="h5" component="h5">
              دیسلاگ
            </Typography>
            <Stack gap={1}>
              {isLoggedIn ? (
                <>
                  <Button variant="contained" href="/dashboard" startIcon={<AccountCircle />} >
                    داشبورد
                  </Button>
                  <Button variant="contained" href="/add-ticket" color="success" >
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
                <Box
                  onClick={handleMobileMenu}
                  className="flex flex-row justify-center gap-1"
                >
                  <Typography variant="body" sx={{ marginLeft: "40px" }}>
                    پرسش ها
                  </Typography>
                  <ExpandMore
                    sx={{ rotate: openMobileMenu ? "180deg" : "90deg" }}
                    className="text-white transition-all relative bottom-[1px]"
                  />
                </Box>

                <Collapse in={openMobileMenu} className="w-full">
                  <Box my={1} sx={{ background: "rgb(14,35,66)" }}>
                    <List disablePadding className="w-full">
                      <ListItem className="hover:bg-slate-500">
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary="همه"
                        ></ListItemText>
                      </ListItem>
                      <ListItem className="hover:bg-slate-500">
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary="فرانت اند"
                        ></ListItemText>
                      </ListItem>
                      <ListItem className="hover:bg-slate-500">
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary="بک اند"
                        ></ListItemText>
                      </ListItem>
                      <ListItem className="hover:bg-slate-500">
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary="موبایل"
                        ></ListItemText>
                      </ListItem>
                      <ListItem className="hover:bg-slate-500">
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary="هک و امنیت"
                        ></ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Collapse>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ textAlign: "center" }} primary="مقالات" />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary="درباره ما"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary="تماس با ما"
                />
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
