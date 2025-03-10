"use client";

import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        About Velora
      </Typography>
      <Typography variant="h6" component="p" textAlign="center" color="text.secondary" mb={4}>
        Our mission is to empower businesses with advanced AI solutions and efficient management tools.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Founded in 2021, Velora was built with a vision to simplify business operations. We combine cutting-edge AI technology with user-friendly interfaces to provide comprehensive solutions for modern enterprises.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We envision a world where technology and innovation seamlessly integrate into daily business operations, fostering growth and operational excellence.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Our dedicated team of experts is committed to delivering the best in technology and innovation.
        </Typography>
      </Box>
    </Container>
  );
}