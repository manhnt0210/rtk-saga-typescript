import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, PeopleAlt } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { styled } from "@mui/material/styles";

const StyleNavLink = styled(NavLink)(({theme}) => ({
  color: 'inherit',
  textDecoration: 'none',

  '&.active > li': {
    backgroundColor: theme.palette.action.selected,
  }
}))

export function Sidebar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <StyleNavLink to='/admin/dashboard'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </StyleNavLink>
          
          <StyleNavLink to='/admin/students'>  
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </StyleNavLink>
        </List>
      </nav>
    </Box>
  );
}
