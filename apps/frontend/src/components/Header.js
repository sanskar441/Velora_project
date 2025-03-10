"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E3B55",  }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Velora
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About Us
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            Contact Us
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Logout <LogoutIcon sx={{ ml: 1 }} />
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}