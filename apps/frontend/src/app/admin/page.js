import { Typography } from '@mui/material';

export default function AdminDashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome, Admin! Manage users, projects, tasks, and view analytics.
      </Typography>
    </>
  );
}