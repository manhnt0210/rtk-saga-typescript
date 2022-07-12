import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/material';
import * as React from 'react';
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}))
export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget ({title, children}: WidgetProps) {
  return (
    <StyledPaper>
      <Typography variant="button">
        {title}
      </Typography>

      <Box mt={2}>{children}</Box>
    </StyledPaper>
  );
}
