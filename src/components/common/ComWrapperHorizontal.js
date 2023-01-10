import React from 'react';
import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';

const ComWrapperHorizontal = ({ children }) => {
  return <Box className="wrapperHorizontal">{children}</Box>;
};

ComWrapperHorizontal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ComWrapperHorizontal;
