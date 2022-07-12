import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from "@mui/material/styles";

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const StyledPaper = styled(Paper)(({theme}) =>({
  diplay: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));


export default function StatisticItem ({ icon, label, value }: StatisticItemProps) {
  return (
    <StyledPaper>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </StyledPaper>
  );
}
