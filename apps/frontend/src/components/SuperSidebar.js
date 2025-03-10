"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import Typography from '@mui/material/Typography';

const SuperSidebar = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/superadmin/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/superadmin/users" },
    { text: "Projects", icon: <WorkIcon />, path: "/superadmin/projects" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/superadmin/tasks" },
    { text: "Settings", icon: <SettingsIcon />, path: "/superadmin/settings" },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
          background: "#2E3B55",
          color: "#FFF",
        },
      }}
    >
      <List>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: open ? "flex-start" : "center",
            padding: "10px",
          }}
        >
          <Tooltip title={open ? "Collapse" : "Expand"}>
            <IconButton onClick={toggleSidebar} sx={{ color: "#FFF" }}>
              {open ? (<Box sx={{display:"flex"}}><Typography variant="h5" gutterBottom>Velora </Typography></Box>) : <MenuIcon />}
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider sx={{ background: "rgba(255,255,255,0.2)" }} />
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            href={item.path}
            sx={{
              background: router.pathname === item.path ? "#1B2430" : "transparent",
              "&:hover": { background: "rgba(255, 255, 255, 0.22)" },
              padding: "10px 15px",
            }}
          >
            <Tooltip title={item.text} placement="right">
              <ListItemIcon sx={{ color: "#FFF", minWidth: open ? 40 : 50 }}>
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {open && <ListItemText sx={{ color: "#FFF" }} primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SuperSidebar;