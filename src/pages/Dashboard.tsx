import React, { useEffect, useState } from 'react';
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
import api from '../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data.data); 
      } catch (error) {
        console.error('Error fetching profile:', error);
        logout();
      }
    };

    fetchProfile();
  }, []);

  return (
    <Card elevation={4} sx={{ p: 3 }}>
      <CardContent>
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}>
            {profile?.name?.charAt(0) || 'U'}
          </Avatar>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome, {profile?.name || 'User'}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            {profile?.email
              ? `You are signed in as ${profile.email}.`
              : 'Loading profile...'}
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
