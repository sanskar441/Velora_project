"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
      if (res.data.data.user.role === "super_admin") {
        localStorage.setItem("token", res.data.data.token);
        router.push("/superadmin/dashboard");
      } else {
        setError("Invalid super admin credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Super Admin Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
            <Button  sx={{ backgroundColor: "#2E3B55" }} variant="contained" type="submit">Login as Super Admin</Button>
          </Stack>
        </form>
        {/* <Box sx={{ mt: 2 }}>
          <Button variant="text" onClick={() => router.push("/superadmin/register")}>Super Admin Sign Up</Button>
        </Box> */}
      </Box>
    </Container>
  );
}