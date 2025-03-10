"use client";

import React from "react";
import { Box, Button, Container, Typography, Stack, Grid, Paper, Card, CardContent, CardActions } from "@mui/material";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#2E3B55" ,
          color: "#fff",
          py: 12,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Transform Your Business with Velora
          </Typography>
          <Typography variant="h5" gutterBottom>
            An AI-powered business management platform designed to optimize operations and drive growth.
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 4 }}>
            <Button variant="contained" size="large" component={Link} href="/login">
              Get Started
            </Button>
            <Button variant="outlined" size="large" sx={{ color: "white", borderColor: "white" }} component={Link} href="/about">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: "#2E3B55",       color: "#fff", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
            Why Choose Velora?
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: "AI-Powered Insights", icon: <TrendingUpIcon fontSize="large" />, desc: "Gain real-time insights to make smarter business decisions." },
              { title: "Team Collaboration", icon: <PeopleIcon fontSize="large" />, desc: "Seamless communication and task tracking for teams." },
              { title: "Business Optimization", icon: <BusinessIcon fontSize="large" />, desc: "Automate workflows and reduce inefficiencies." },
              { title: "Customer Support", icon: <StarIcon fontSize="large" />, desc: "24/7 support to assist you whenever needed." },
            ].map((feature, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: "John Doe", company: "TechCorp", review: "Velora has completely transformed how we manage our business!" },
              { name: "Sarah Johnson", company: "StartupX", review: "The AI-powered insights have been a game-changer for decision-making." },
              { name: "Michael Lee", company: "Enterprise Solutions", review: "Excellent platform with top-notch support." },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 3, textAlign: "left", borderLeft: "5px solid #1e88e5" }}>
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    "{testimonial.review}"
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
                    - {testimonial.name}, {testimonial.company}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 10, bgcolor: "#f5f5f5", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
            Pricing Plans
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: "Starter", price: "$9.99/month", features: ["Basic Features", "Limited Support", "Single User"] },
              { title: "Business", price: "$29.99/month", features: ["Advanced Features", "Priority Support", "Up to 10 Users"] },
              { title: "Enterprise", price: "Custom", features: ["All Features", "Dedicated Support", "Unlimited Users"] },
            ].map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    {plan.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e88e5" }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {plan.features.join(" • ")}
                  </Typography>
                  <CardActions sx={{ justifyContent: "center", mt: 3 }}>
                    <Button variant="contained">Get Started</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call-To-Action Section */}
      <Box
        sx={{
          backgroundColor: "#2E3B55",        
          color: "#fff",
          textAlign: "center",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold"  }}>
            Ready to Elevate Your Business?
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            Join thousands of businesses using Velora to scale operations and increase productivity.
          </Typography>
          <Button variant="contained" size="large" component={Link} href="/register">
            Get Started for Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
}