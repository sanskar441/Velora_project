"use client";
import React, { useState, useEffect } from "react";
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

const DUMMY_TOKEN = "YOUR_TOKEN";

export default function SuperAdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "initial",
    assigned_to: "", // user ID
    project: "", // project ID
  });
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/getAllTasks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTask({
        title: "",
        description: "",
        status: "initial",
        assigned_to: "",
        project: "",
      });
      setOpenAddModal(false);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding task");
    }
  };

  const handleEditTask = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${editTask._id}`,
        editTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenEditModal(false);
      setEditTask(null);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting task");
    }
  };

  const openEditDialog = (task) => {
    setEditTask(task);
    setOpenEditModal(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Manage Tasks
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        onClick={() => setOpenAddModal(true)}
        sx={{ mb: 2 }}
      >
        Add New Task
      </Button>
      <Paper sx={{ overflowX: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Assigned To</strong>
              </TableCell>
              <TableCell>
                <strong>Project</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.assigned_to ? task.assigned_to.name : "N/A"}
                </TableCell>
                <TableCell>
                  {task.project ? task.project.name : "N/A"}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteTask(task._id)}
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

      {/* Add Task Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Status"
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            helperText="initial, in progress, or completed"
          />
          <TextField
            label="Assigned To (User ID)"
            name="assigned_to"
            value={newTask.assigned_to}
            onChange={handleInputChange}
          />
          <TextField
            label="Project (Project ID)"
            name="project"
            value={newTask.project}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {editTask && (
            <>
              <TextField
                label="Title"
                name="title"
                value={editTask.title}
                onChange={handleEditInputChange}
              />
              <TextField
                label="Description"
                name="description"
                value={editTask.description}
                onChange={handleEditInputChange}
              />
              <TextField
                label="Status"
                name="status"
                value={editTask.status}
                onChange={handleEditInputChange}
                helperText="initial, in progress, or completed"
              />
              <TextField
                label="Assigned To (User ID)"
                name="assigned_to"
                value={editTask.assigned_to}
                onChange={handleEditInputChange}
              />
              <TextField
                label="Project (Project ID)"
                name="project"
                value={editTask.project}
                onChange={handleEditInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditTask}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}