import { ArrowRight, ExpandMore, Login, Menu } from "@mui/icons-material";
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
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const handleCloseMobileDrawer = () => setOpenMobileDrawer(false);
  const handleOpenMobileDrawer = () => setOpenMobileDrawer(true);

  return (
    <Container className="mt-3">
      <AppBar position="static" sx={{ bgcolor: "rgb(14,35,66)" }}>
        <Toolbar className="flex justify-between">
          <MobileDrawer
            openMobileDrawer={openMobileDrawer}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            handleOpenMobileDrawer={handleOpenMobileDrawer}
          />
          <Button
            sx={{ display: { lg: "none" } }}
            color="inherit"
            onClick={handleOpenMobileDrawer}
          >
            <Menu fontSize="large" />
          </Button>

          <Typography variant="h5" component="h5">
            دیسلاگ
          </Typography>

          <PcMenu />

          {isLoggedIn ? (
            <Button href="/logout" variant="contained" color="error">خروج</Button>
          ) : (
            <Button color="inherit" href="/register">
              <Login />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
