import LoginPage from './LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import { logout } from '../modules/user';
import React, { useState, useCallback } from 'react';
import ComWorkframeTab from '../components/common/ComWorkframeTab';

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
    <>
      {user ? (
        <div className="mainFrame">
          <div className="header">
            This is mainpage. <b>ID: {user.userIdxx}</b>
            <Button type="submit" onClick={onLogout}>
              Logout
            </Button>
            <div>
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
            </div>
          </div>
          <ComWorkframeTab
            tabs={tabs}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default MainPage;
