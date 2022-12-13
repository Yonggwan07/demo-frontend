import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComBackdrop from '../components/common/ComBackdrop';
import ComDialog from '../components/common/ComDialog';
import ComSnackbar from '../components/common/ComSnackbar';
import ComWorkframeTab from '../components/common/ComWorkframeTab';
import { logout } from '../modules/user';
import LoginPage from './LoginPage';

const MainPage = ({ColorModeContext }) => {
  const [tabs, setTabs] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector(({ userInfo }) => ({
    user: userInfo.userInfo,
  }));

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onMenuButtonClick = useCallback(
    (e) => {
      if (tabs.find((tab) => tab.menuId === e.target.value) === undefined) {
        setTabs((tabs) =>
          tabs.concat({
            index: tabs.length,
            menuId: e.target.value,
            label: e.target.innerText,
          }),
        );
        setTabValue(tabs.length);
      } else {
        setTabValue(tabs.find((tab) => tab.menuId === e.target.value).index);
      }
    },
    [tabs],
  );

  return (
    <Box>
      {user ? (
        <Box>
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
            <Button type="submit" variant="outlined" onClick={onLogout}>
              Logout
            </Button>
            <ButtonGroup variant="contained">
              <Button
                type="button"
                name="currMenu"
                value="TMMA0010"
                onClick={onMenuButtonClick}
              >
                공통코드관리
              </Button>
              <Button
                type="button"
                name="currMenu"
                value="TMMA0012"
                onClick={onMenuButtonClick}
              >
                세부코드관리
              </Button>
            </ButtonGroup>
          </Box>
          <ComBackdrop />
          <ComSnackbar />
          <ComDialog />
          <ComWorkframeTab
            tabs={tabs}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </Box>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
};

export default MainPage;
