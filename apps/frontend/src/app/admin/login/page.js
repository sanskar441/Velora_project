"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" , role:"admin"});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
      if (res.data.data.user.role === "admin") {
        localStorage.setItem("token", res.data.data.token);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
            <Button sx={{ backgroundColor: "#2E3B55" }} variant="contained" type="submit">Login as Admin</Button>
          </Stack>
        </form>
        {error && <Typography color="error" sx={{p:"10px"}}>{error}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Button variant="text" sx={{color:"#2E3B55"}} onClick={() => router.push("/admin/register")}>Admin Sign</Button>
        </Box>
      </Box>
    </Container>
  );
}