import React from 'react';
import { Box } from '@mui/material';

const ComWrapperVertical = ({ children }) => {
  return (
    <Box className='wrapperVertical'>
      {children}
    </Box>
  );
};

export default ComWrapperVertical;
