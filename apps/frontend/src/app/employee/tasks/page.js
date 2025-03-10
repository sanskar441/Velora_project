"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  MenuItem as SelectMenuItem,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("User");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const router = useRouter();

  // Fetch Tasks and User Details
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
    
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/mytasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching tasks");
        setLoading(false);
      });
  }, []);

  // Handle Profile Dropdown
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleChangePassword = () => {
    router.push("/change-password");
    handleMenuClose();
  };
  const handleEditProfile = () => {
    router.push("/update-details");
    handleMenuClose();
  };

  // Count Task Status
  const getStatusCounts = () => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
  };

  // Generate Chart Data
  const statusCounts = getStatusCounts();
  const doughnutChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#f44336", "#ff9800", "#4caf50", "#2196f3"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Task Count",
        data: Object.values(statusCounts),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Handle Task Status Change
  const handleStatusChange = (taskId, newStatus) => {
    setUpdatingTaskId(taskId);
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
        setUpdatingTaskId(null);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error updating status");
        setUpdatingTaskId(null);
      });
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Typography variant="h5">My Tasks</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1 }}>Hi, {userName}</Typography>
          <IconButton onClick={handleAvatarClick}>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
          </Menu>
        </Box>
      </Paper>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Task Status Breakdown</Typography>
            <Doughnut data={doughnutChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Task Count Overview</Typography>
            <Bar data={barChartData} options={{ responsive: true }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Task List */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>My Tasks</Typography>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card sx={{ minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">Status: {task.status}</Typography>
                {task.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {task.description}
                  </Typography>
                )}
              </CardContent>
              <Box sx={{ p: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`status-label-${task._id}`}>Change Status</InputLabel>
                  <Select
                    labelId={`status-label-${task._id}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    disabled={updatingTaskId === task._id}
                  >
                    <SelectMenuItem value="initial">Initial</SelectMenuItem>
                    <SelectMenuItem value="in progress">In Progress</SelectMenuItem>
                    <SelectMenuItem value="done">Done</SelectMenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}