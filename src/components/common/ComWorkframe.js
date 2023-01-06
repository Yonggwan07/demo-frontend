import React, { memo } from 'react';
import Box from '@mui/material/Box';

const ComWorkframe = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {children}
  </Box>
);

export default memo(ComWorkframe);
