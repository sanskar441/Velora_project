"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UpdateDetailsPage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.data.name, email: res.data.data.email });
      } catch (err) {
        setError("Error fetching user details");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-details`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Details updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating details");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Update Your Details
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button variant="contained" type="submit">
              Update Details
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}