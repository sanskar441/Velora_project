import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkIcon from '@mui/icons-material/Work';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

const EmployeeSidebar = () => {
  const menuItems = [
    // { text: 'Dashboard', icon: <DashboardIcon />, path: '/employee/dashboard' },
    { text: 'My Tasks', icon: <AssignmentIcon />, path: '/employee/tasks' },
    // { text: 'My Projects', icon: <WorkIcon />, path: '/employee/projects' },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}>
        <Typography variant="h5" sx={{margin : 3}} gutterBottom>
        Velora
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default EmployeeSidebar;