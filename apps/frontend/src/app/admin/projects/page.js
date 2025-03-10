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
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const DUMMY_TOKEN = "YOUR_TOKEN";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    priority: "medium",
  });
  const [editProject, setEditProject] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewProject({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        priority: "medium",
      });
      setOpenAddModal(false);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding project");
    }
  };

  const handleEditProject = async () => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/projects/${editProject._id}`, editProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenEditModal(false);
      setEditProject(null);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token") || DUMMY_TOKEN;
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting project");
    }
  };

  const openEditDialog = (project) => {
    setEditProject(project);
    setOpenEditModal(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Projects
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Button variant="contained" onClick={() => setOpenAddModal(true)} sx={{ mb: 2 }}>
        Add New Project
      </Button>
      <Paper sx={{ overflowX: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Start Date</strong></TableCell>
              <TableCell><strong>End Date</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.start_date ? new Date(project.start_date).toLocaleDateString() : ""}</TableCell>
                <TableCell>{project.end_date ? new Date(project.end_date).toLocaleDateString() : ""}</TableCell>
                <TableCell>{project.priority}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => openEditDialog(project)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteProject(project._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Project Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={newProject.name} onChange={handleInputChange} />
          <TextField label="Description" name="description" value={newProject.description} onChange={handleInputChange} />
          <TextField
            label="Start Date"
            name="start_date"
            type="date"
            value={newProject.start_date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            name="end_date"
            type="date"
            value={newProject.end_date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Priority"
            name="priority"
            value={newProject.priority}
            onChange={handleInputChange}
            helperText="low, medium, or high"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddProject}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Project Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {editProject && (
            <>
              <TextField label="Name" name="name" value={editProject.name} onChange={handleEditInputChange} />
              <TextField label="Description" name="description" value={editProject.description} onChange={handleEditInputChange} />
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={editProject.start_date ? editProject.start_date.substring(0, 10) : ""}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="end_date"
                type="date"
                value={editProject.end_date ? editProject.end_date.substring(0, 10) : ""}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="Priority" name="priority" value={editProject.priority} onChange={handleEditInputChange} helperText="low, medium, or high" />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProject}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}