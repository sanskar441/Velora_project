"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ 
        p: 3, 
        backgroundColor: "#2E3B55", 
        textAlign: "center", 
        color: "white",
        mt: "auto"
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Velora. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;