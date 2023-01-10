import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';

const ComWorkframe = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {children}
  </Box>
);

ComWorkframe.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default memo(ComWorkframe);
