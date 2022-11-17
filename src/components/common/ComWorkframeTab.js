import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Suspense, useState, lazy, useCallback, useMemo, memo } from 'react';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
} from '../../../node_modules/@mui/material/index';

const TabPanel = memo(function TabPanel(props) {
  const { children, value, index, menuId, ...other } = props;
  const Menu = useMemo(
    () =>
      lazy(() =>
        import(`../../pages/${menuId.substring(0, 3).toLowerCase()}/${menuId}`),
      ),
    [menuId],
  );

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const handleSnackBar = useCallback((message, severity = 'success') => {
    setSnackBarSeverity(severity);
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  }, []);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleBackdrop = (isOpen) => {
    setOpenBackdrop(isOpen);
  };

  const handleClose = useCallback(() => {
    setSnackBarMessage('');
    setSnackBarOpen(false);
  }, []);

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
        style={{
          position: 'absolute',
          top: '101px',
          width: 'calc(100% - 2rem)',
          height: 'calc(100% - 133px)',
          zIndex: value === index ? '1' : '9999',
          padding: '1rem',
        }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress coclor="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackBarOpen}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            severity={snackBarSeverity}
            sx={{ width: '100%' }}
            elevation={6} // Shadow depth
            variant="filled"
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <Suspense>
          <Menu
            handleSnackBar={handleSnackBar}
            handleBackdrop={handleBackdrop}
          />
        </Suspense>
      </div>
    </>
  );
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ComWorkframeTab = ({ tabs, tabValue, setTabValue }) => {
  const handleChange = useCallback(
    (_e, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  return (
    <div style={{ height: 'calc(100% - 3.25rem)' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {tabs.map(({ index, label, menuId }) => (
            <Tab key={menuId} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ index, menuId }) => (
        <TabPanel key={menuId} value={tabValue} index={index} menuId={menuId} />
      ))}
    </div>
  );
};

export default memo(ComWorkframeTab);
