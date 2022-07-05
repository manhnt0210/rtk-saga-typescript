import * as React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material'
import { styled } from '@mui/system';

const MyComponent = styled('div')({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

export default function LoginPage () {
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
          <Button fullWidth variant="contained" color="primary">
            Fake Login
          </Button>
        </Box>
      </Paper>
    </MyComponent>
  );
}

