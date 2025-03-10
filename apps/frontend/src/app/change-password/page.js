"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage("Password changed successfully");
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Old Password"
              name="oldPassword"
              type="password"
              value={form.oldPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={form.confirmNewPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button variant="contained" type="submit">
              Change Password
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}