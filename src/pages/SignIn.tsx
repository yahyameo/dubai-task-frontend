
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { ApiError, ApiSuccess } from '../types/api-response';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {

    try {
      const response = await api.post<ApiSuccess<{ token: string }>>('/auth/signin', data);
      localStorage.setItem('token', response.data.data.token);
      toast.success(response.data.message || 'Signed in successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      const error: ApiError = err.response?.data;
      toast.error(error?.message || 'Invalid credentials.');
    }
    
  };

  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" align="center">Sign In</Typography>
          <Divider />

          <TextField label="Email Address" {...register('email')} fullWidth />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack spacing={2}>
            <Button variant="contained" type="submit" size="large">Sign In</Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignIn;