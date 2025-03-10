"use client";

import React from 'react';
import { Box } from '@mui/material';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import useAuth from '../../hooks/useAuth';

export default function EmployeeLayout({ children }) {
  // const isAuthenticated = useAuth();
  return (
    <Box sx={{ display: 'flex' }}>
      {/* {isAuthenticated && <EmployeeSidebar />} */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3, ml: isAuthenticated ? { xs: 0, sm: '240px' } : 0 }}>
        {children}
      </Box> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 0 }}>
        {children}
      </Box>
    </Box>
  );
}