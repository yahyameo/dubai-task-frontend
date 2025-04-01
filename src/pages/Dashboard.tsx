import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import { Logout } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <Card elevation={4} sx={{ p: 3 }}>
      <CardContent>
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}>U</Avatar>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Application
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            You are successfully signed in. This is your dashboard where you can manage your profile and settings.
          </Typography>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={logout}
            size="large"
          >
            Logout
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
