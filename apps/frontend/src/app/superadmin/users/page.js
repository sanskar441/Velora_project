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
  Paper,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DUMMY_TOKEN = "YOUR_TOKEN";

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${editingUser._id}`,
        editingUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingUser(null);
      setOpenEditModal(false);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating user");
    }
  };

  const openEditDialog = (user) => {
    setEditingUser(user);
    setOpenEditModal(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        onClick={() => setOpenAddModal(true)}
        sx={{ mb: 2 }}
      >
        Add New User
      </Button>
      <Paper sx={{ overflowX: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add User Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle >Add New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            helperText="super_admin, admin, or employee"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {editingUser && (
            <>
              <TextField
                label="Name"
                name="name"
                value={editingUser.name}
                onChange={handleEditChange}
              />
              <TextField
                label="Email"
                name="email"
                value={editingUser.email}
                onChange={handleEditChange}
              />
              <TextField
                label="Role"
                name="role"
                value={editingUser.role}
                onChange={handleEditChange}
                helperText="super_admin, admin, or employee"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}