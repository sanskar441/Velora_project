"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      router.push("/sysadmin/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Admin Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
            <TextField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} fullWidth required />
            <Button variant="contained" type="submit">Sign Up as Admin</Button>
          </Stack>
        </form>
      </Box>
      <Box sx={{ mt: 2 }}>
          <Button variant="text" onClick={() => router.push("/admin/login")}>Admin login Up</Button>
        </Box>
    </Container>
  );
}