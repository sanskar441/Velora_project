"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack , Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "employee" });
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
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container maxWidth="md">
    <Grid container sx={{ height: "100vh", alignItems: "center" }}>
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="/signup.jpg"
          alt="Login"
          style={{ maxWidth: "100%", height: "80%", objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>
          User Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
          <TextField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} fullWidth required />
          <Button sx={{ backgroundColor: "#2E3B55" }} variant="contained" type="submit">Sign Up as user</Button>
        </Stack>
      </form>

          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="text" sx={{ color: "#2E3B55" }} onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </Container>
    
  );
}