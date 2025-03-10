"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Stack, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "employee" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.data.token);
      router.push("/employee/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container sx={{ height: "100vh", alignItems: "center" }}>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="/login.png"
            alt="Login"
            style={{ maxWidth: "100%", height: "80%", objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" gutterBottom>
              User Login
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack spacing={2}>
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
                <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
                <Button sx={{ backgroundColor: "#2E3B55" }} variant="contained" type="submit">
                  Login
                </Button>
              </Stack>
            </form>

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="text" sx={{ color: "#2E3B55" }} onClick={() => router.push("/forgot-password")}>
                Forgot Password?
              </Button>
              <Button variant="text" sx={{ color: "#2E3B55" }} onClick={() => router.push("/register")}>
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
