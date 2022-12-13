import LoginPage from './LoginPage';
import { useSelector, useDispatch } from 'react-redux';
//import Button from '../components/common/Button';
import { logout } from '../modules/user';
import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ComWorkframeTab from '../components/common/ComWorkframeTab';
import ComBackdrop from '../components/common/ComBackdrop';
import ComSnackbar from '../components/common/ComSnackbar';
import ComDialog from '../components/common/ComDialog';

const MainPage = () => {
  const [tabs, setTabs] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector(({ userInfo }) => ({
    user: userInfo.userInfo,
  }));

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
