"use client";
import React, { useState } from "react";
import { Typography, Box, TextField, Button, Paper, Stack } from "@mui/material";
import axios from "axios";

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: "",
    adminEmail: "",
    maintenanceMode: false,
    // Add additional settings as required
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Replace with your API endpoint for updating settings
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings`, settings);
      setMessage("Settings updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating settings");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Stack spacing={2}>
        <TextField
          label="Site Title"
          name="siteTitle"
          value={settings.siteTitle}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Admin Email"
          name="adminEmail"
          value={settings.adminEmail}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Maintenance Mode"
          name="maintenanceMode"
          value={settings.maintenanceMode ? "Enabled" : "Disabled"}
          onChange={(e) =>
            setSettings({
              ...settings,
              maintenanceMode: e.target.value.toLowerCase() === "enabled",
            })
          }
          fullWidth
          helperText="Type 'Enabled' to turn on maintenance mode"
        />
        <Button variant="contained" onClick={handleSave}>
          Save Settings
        </Button>
      </Stack>
    </Paper>
  );
}