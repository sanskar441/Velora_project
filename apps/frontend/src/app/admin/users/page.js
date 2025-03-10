"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DUMMY_TOKEN = "YOUR_TOKEN";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Decode token to get current user role
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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let fetchedUsers = res.data.data;
      if (currentUserRole === "admin") {
        fetchedUsers = fetchedUsers.filter((user) => user.role !== "super_admin");
      }
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh, currentUserRole]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUser({ name: "", email: "", password: "", role: "employee" });
      setOpenAddModal(false);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding user");
    }
  };

  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${editUser._id}`,
        editUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenEditModal(false);
      setEditUser(null);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating user");
    }
  };

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

  const openEditDialog = (user) => {
    setEditUser(user);
    setOpenEditModal(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Button variant="contained" onClick={() => setOpenAddModal(true)} sx={{ mb: 2 }}>
        Add New User
      </Button>
      <Paper sx={{ overflowX: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => openEditDialog(user)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add User Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle >Add New User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={newUser.name} onChange={handleInputChange} />
          <TextField label="Email" name="email" value={newUser.email} onChange={handleInputChange} />
          <TextField label="Password" name="password" type="password" value={newUser.password} onChange={handleInputChange} />
          <TextField label="Role" name="role" value={newUser.role} onChange={handleInputChange} helperText="super_admin, admin, or employee" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {editUser && (
            <>
              <TextField label="Name" name="name" value={editUser.name} onChange={handleEditInputChange} />
              <TextField label="Email" name="email" value={editUser.email} onChange={handleEditInputChange} />
              <TextField label="Role" name="role" value={editUser.role} onChange={handleEditInputChange} helperText="super_admin, admin, or employee" />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}