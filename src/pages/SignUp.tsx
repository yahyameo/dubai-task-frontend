
// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
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
import { ApiError, ApiSuccess } from '../types/api-response';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  password: yup
    .string()
    .min(8)
    .matches(/[a-zA-Z]/)
    .matches(/\d/)
    .matches(/[^a-zA-Z0-9]/)
    .required(),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post<ApiSuccess>('/auth/signup', data);
      toast.success(response.data.message || 'Signup successful!');
    } catch (err: any) {
      const error: ApiError = err.response?.data;
      toast.error(error?.message || 'Signup failed.');
    }
  };


  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" align="center">Create an Account</Typography>
          <Divider />

          <TextField
            label="Email Address"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Full Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
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
            <Button variant="contained" type="submit" size="large">Sign Up</Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/signin')}>Already have an account? Sign In</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignUp;