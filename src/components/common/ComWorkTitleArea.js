import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { memo } from 'react';

const ComWorkTitleArea = ({ id, title }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'initial',
      margin: '1rem 0 1rem 1rem',
    }}
  >
    <Box style={{ display: 'flex' }}>
      <Typography variant="h5">{title}</Typography>
      <Typography
        variant="h6"
        sx={{ paddingLeft: '1rem', color: 'text.secondary' }}
      >
        ID: {id.toUpperCase()}
      </Typography>
    </Box>
  </Box>
);

ComWorkTitleArea.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(ComWorkTitleArea);
