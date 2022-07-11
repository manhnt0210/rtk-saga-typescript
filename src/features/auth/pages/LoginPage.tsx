import * as React from 'react';
import { Paper, Typography, Box, Button, CircularProgress } from '@mui/material'
import { styled } from '@mui/system';
import { authActions } from '../authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const MyComponent = styled('div')({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

export default function LoginPage () {
  const dispatch = useAppDispatch();
  const isLogging  = useAppSelector(state => state.auth.logging)

  const handleLoginClick = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }));
  };

  return (
    <MyComponent>
      <Paper sx={
        {
          padding: '32px',
        }
      }>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            { isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </MyComponent>
  );
}

