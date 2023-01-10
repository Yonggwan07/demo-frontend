import React from 'react';
import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';

const ComWrapperVertical = ({ children }) => {
  return <Box className="wrapperVertical">{children}</Box>;
};

ComWrapperVertical.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ComWrapperVertical;
