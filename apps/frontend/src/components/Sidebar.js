"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Projects", icon: <WorkIcon />, path: "/admin/projects" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/admin/tasks" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          background: "#2E3B55",
          color: "#FFF",
          paddingTop: 2,
        },
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", pb: 2 }}>
        Velora
      </Typography>
      <Divider sx={{ background: "rgba(255,255,255,0.2)", mb: 1 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            href={item.path}
            sx={{
              background: router.pathname === item.path ? "#1B2430" : "transparent",
              "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
              padding: "12px 20px",
            }}
          >
            <Tooltip title={item.text} placement="right">
              <ListItemIcon sx={{ color: "#FFF" }}>{item.icon}</ListItemIcon>
            </Tooltip>
            <ListItemText sx={{ color: "#FFF" }} primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;