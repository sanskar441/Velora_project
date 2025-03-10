"use client";

import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Stack, Paper, Grid } from "@mui/material";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, display a success message. In production, post to your API.
    setSuccess("Thank you for contacting us. We will get back to you soon!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Have any questions? Need support? Fill out the form and we'll respond as soon as possible.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
                <TextField label="Message" name="message" value={form.message} onChange={handleChange} fullWidth multiline rows={4} required />
                <Button variant="contained" type="submit">Send Message</Button>
              </Stack>
            </form>
            {success && (
              <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                {success}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Our Office
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              123 Velora Avenue, Suite 100<br />
              Innovation City, Country 12345
            </Typography>
            <Typography variant="h6" gutterBottom>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: info@velora.com
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Office Hours: Monday to Friday, 9 AM - 5 PM
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}