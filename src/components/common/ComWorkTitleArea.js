import { Box, Typography, Breadcrumbs, Chip } from '@mui/material';
import { PropTypes } from 'prop-types';
import { memo } from 'react';
import { styled } from '@mui/material/styles';

const StyledBreadcrumbs = styled(Breadcrumbs)({
  // display: 'flex',
  paddingLeft: '1.5rem',
  fontWeight: 'bold',
  // '& .MuiTypography-root': {
  //   fontSize: '0.875rem',
  // },
});

const ComWorkTitleArea = ({ menuInfo: { id, name, upperMenus } }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'initial',
      margin: '1rem 0 1rem 1rem',
    }}
  >
    <Box style={{ display: 'flex' }}>
      <Typography variant="h5">{name}</Typography>
      <Typography
        variant="h6"
        sx={{ paddingLeft: '1rem', color: 'text.secondary' }}
      >
        ID: {id.toUpperCase()}
      </Typography>
      <StyledBreadcrumbs separator=">">
        {[
          <Chip
            key={upperMenus[0]}
            label={upperMenus[0]}
            variant="outlined"
            size="small"
          />,
          <Chip
            key={upperMenus[1]}
            label={upperMenus[1]}
            variant="outlined"
            size="small"
          />,
          <Chip key={name} label={name} variant="outlined" size="small" />,
        ]}
      </StyledBreadcrumbs>
    </Box>
  </Box>
);

ComWorkTitleArea.propTypes = {
  menuInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    upperMenus: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default memo(ComWorkTitleArea);
