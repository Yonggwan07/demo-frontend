import React from 'react';
import { PropTypes } from 'prop-types';
import { Paper } from '@mui/material';
import ComWrapperHorizontal from './ComWrapperHorizontal';
import ComWrapperVertical from './ComWrapperVertical';

const v = 'vertical';
const h = 'horizontal';

const setDirection = (direction) => {
  const d = !direction ? 'H' : direction.toUpperCase();
  switch (d) {
    case 'VERTICAL':
    case 'V':
      return v;
    case 'HORIZONTAL':
    case 'H':
    default:
      return h;
  }
};

const ComCompArea = ({ direction, children }) => {
  const d = setDirection(direction);
  return (
    <Paper elevation={6} sx={{ height: '100%', p: 1 }}>
      {d === v && <ComWrapperVertical>{children}</ComWrapperVertical>}
      {d === h && <ComWrapperHorizontal>{children}</ComWrapperHorizontal>}
    </Paper>
  );
};

ComCompArea.propTypes = {
  direction: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ComCompArea;
