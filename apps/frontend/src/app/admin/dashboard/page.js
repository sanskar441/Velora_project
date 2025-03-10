"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Table,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Admin");
  // const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/getAllTasks`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([usersRes, tasksRes, projectsRes]) => {
        setUsers(usersRes.data.data);
        setTasks(tasksRes.data.data);
        setProjects(projectsRes.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching analytics data");
        setLoading(false);
      });
  }, []);

  const getUserRoleCounts = () => {
    return users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleChangePassword = () => {
    router.push("/change-password");
    handleMenuClose();
  };
  
  const handleEditProfile = () => {
    router.push("/update-details");
    handleMenuClose();
  };

  const getTaskStatusCounts = () => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
  };

  const getProjectPriorityCounts = () => {
    return projects.reduce((acc, project) => {
      acc[project.priority] = (acc[project.priority] || 0) + 1;
      return acc;
    }, {});
  };

  const userRoleCounts = getUserRoleCounts();
  const userChartData = {
    labels: Object.keys(userRoleCounts),
    datasets: [
      {
        data: Object.values(userRoleCounts),
        backgroundColor: ["#f44336", "#ff9800", "#4caf50"],
      },
    ],
  };

  const taskStatusCounts = getTaskStatusCounts();
  const taskChartData = {
    labels: Object.keys(taskStatusCounts),
    datasets: [
      {
        data: Object.values(taskStatusCounts),
        backgroundColor: ["#2196f3", "#ff9800", "#4caf50", "#f44336"],
      },
    ],
  };

  const projectPriorityCounts = getProjectPriorityCounts();
  const projectChartData = {
    labels: Object.keys(projectPriorityCounts),
    datasets: [
      {
        data: Object.values(projectPriorityCounts),
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const overallCounts = {
    Users: users.length,
    Tasks: tasks.length,
    Projects: projects.length,
  };
  const overallChartData = {
    labels: Object.keys(overallCounts),
    datasets: [
      {
        label: "Overall Counts",
        data: Object.values(overallCounts),
        backgroundColor: ["#2196f3", "#ff9800", "#4caf50"],
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
      <Typography variant="h4" gutterBottom>
        Admin Analytics Dashboard
      </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Hi, {userName}
          </Typography>
          <IconButton onClick={handleAvatarClick}>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Users by Role
            </Typography>
            <Doughnut data={userChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tasks by Status
            </Typography>
            <Doughnut data={taskChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Projects by Priority
            </Typography>
            <Doughnut data={projectChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Overall Counts
            </Typography>
            <Bar data={overallChartData} options={{ responsive: true }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Employee Details Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Employee Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}