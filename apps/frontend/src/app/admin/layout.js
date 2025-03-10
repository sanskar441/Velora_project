"use client";

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import useAuth from '../../hooks/useAuth';

export default function AdminLayout({ children }) {
  const isAuthenticated = useAuth();
  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: isAuthenticated ? { xs: 0, sm: '100px' } : 0 }}>
        {children}
      </Box>
    </Box>
  );
}