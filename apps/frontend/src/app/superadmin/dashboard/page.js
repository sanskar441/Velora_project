"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import jwt_decode from "jwt-decode";

const DUMMY_TOKEN = "YOUR_TOKEN"; // Replace with real token management

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || DUMMY_TOKEN;
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setCurrentUserRole(decoded.role);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || DUMMY_TOKEN;
        const [usersRes, tasksRes, projectsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/getAllTasks`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(usersRes.data.data);
        setTasks(tasksRes.data.data);
        setProjects(projectsRes.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  // Helper Functions for Charts
  const getUserRoleCounts = () => {
    return users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
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

  const userChartData = {
    labels: Object.keys(getUserRoleCounts()),
    datasets: [{ data: Object.values(getUserRoleCounts()), backgroundColor: ["#f44336", "#ff9800", "#4caf50"] }],
  };

  const taskChartData = {
    labels: Object.keys(getTaskStatusCounts()),
    datasets: [{ data: Object.values(getTaskStatusCounts()), backgroundColor: ["#2196f3", "#ff9800", "#4caf50"] }],
  };

  const projectChartData = {
    labels: Object.keys(getProjectPriorityCounts()),
    datasets: [{ data: Object.values(getProjectPriorityCounts()), backgroundColor: ["#4caf50", "#ff9800", "#f44336"] }],
  };

  const overallChartData = {
    labels: ["Users", "Tasks", "Projects"],
    datasets: [{ label: "Total Count", data: [users.length, tasks.length, projects.length], backgroundColor: ["#2196f3", "#ff9800", "#4caf50"] }],
  };

  // Handle Edit & Delete
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting user");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenEditModal(false);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating user");
    }
  };

  if (loading) return <Box sx={{ textAlign: "center", mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ textAlign: "center", mt: 4 }}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Super Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}><Paper sx={{ p: 2 }}><Typography variant="h6">Users by Role</Typography><Doughnut data={userChartData} /></Paper></Grid>
        <Grid item xs={12} md={6}><Paper sx={{ p: 2 }}><Typography variant="h6">Tasks by Status</Typography><Doughnut data={taskChartData} /></Paper></Grid>
        <Grid item xs={12} md={6}><Paper sx={{ p: 2 }}><Typography variant="h6">Projects by Priority</Typography><Doughnut data={projectChartData} /></Paper></Grid>
        <Grid item xs={12} md={6}><Paper sx={{ p: 2 }}><Typography variant="h6">Overall Count</Typography><Bar data={overallChartData} options={{ responsive: true }} /></Paper></Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4 }}>User Management</Typography>
      <Paper sx={{ overflowX: "auto", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell><TableCell>Actions</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditUser(user)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}><DialogTitle>Edit User</DialogTitle><DialogContent><TextField label="Name" name="name" value={editingUser?.name || ""} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} /></DialogContent><DialogActions><Button onClick={() => setOpenEditModal(false)}>Cancel</Button><Button onClick={handleUpdateUser}>Save</Button></DialogActions></Dialog>
    </Box>
  );
}