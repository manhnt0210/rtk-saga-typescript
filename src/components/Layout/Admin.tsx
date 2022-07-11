
import { Box } from '@mui/system';
import { styled } from "@mui/material/styles";
import * as React from 'react';

import { Header, Sidebar } from '../Common';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../features/dashboard';
import Student from '../../features/student';

const StyledSidebar = styled(Box)(({theme})=> ({
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#fff'
}))

const StyledMain = styled(Box)(({theme}) => ({
  padding: theme.spacing(2, 3),
}))

export function AdminLayout() {
  return (
    <Box 
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
      }}
    >
      <Box className="header" sx={{ gridArea: 'header' }}>
        <Header />
      </Box>

      <StyledSidebar className="sidebar" sx={{ gridArea: 'sidebar' }}>
        <Sidebar />
      </StyledSidebar>

      <StyledMain className="main" sx={{ gridArea: 'main', bgcolor: '#fff' }}>
        <Routes>
          <Route
            path='/dashboard'
            element={<Dashboard />}
          >
          </Route>

          <Route
            path='/students'
            element={<Student />}
          >
          </Route>
        </Routes>
      </StyledMain>
    </Box>
  );
}
