import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ComBackdrop from '../components/common/ComBackdrop';
import ComDialog from '../components/common/ComDialog';
import ComSideMenuList from '../components/common/ComSideMenuList';
import ComSnackbar from '../components/common/ComSnackbar';
import ComWorkframeTab from '../components/common/ComWorkframeTab';
import { logout } from '../modules/user';
import LoginPage from './LoginPage';

const MainPage = ({ ColorModeContext }) => {
  const [tabs, setTabs] = useState([]);
  const [tabValue, setTabValue] = useState('');
  const { user } = useSelector(({ userInfo }) => ({
    user: userInfo.userInfo,
  }));
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    setTabs([]); // 모든 탭 제거
    dispatch(logout());
  }, [dispatch]);

  const handleSideMenuOpen = useCallback(
    () => setSideMenuOpen(!sideMenuOpen),
    [sideMenuOpen],
  );

  return (
    <Box sx={{ height: '100%' }}>
      {user ? (
        <>
          <ComSideMenuList
            tabs={tabs}
            setTabs={setTabs}
            setTabValue={setTabValue}
            open={sideMenuOpen}
            setOpen={setSideMenuOpen}
          />
          <Box sx={{ height: '100%' }}>
            {/* TOPFRAME*/}
            <Box>
              This is mainpage. <b>ID: {user.userIdxx}</b>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              <Button type="button" onClick={handleSideMenuOpen}>
                Side
              </Button>
              <Button type="submit" variant="outlined" onClick={onLogout}>
                Logout
              </Button>
            </Box>
            <ComBackdrop />
            <ComSnackbar />
            <ComDialog />
            {/* WORKFRAME */}
            <ComWorkframeTab
              tabs={tabs}
              setTabs={setTabs}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
          </Box>
        </>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
};

MainPage.propTypes = {
  ColorModeContext: PropTypes.elementType.isRequired,
};

export default MainPage;
