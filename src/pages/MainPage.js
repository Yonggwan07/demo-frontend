import LoginPage from './LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import { logout } from '../modules/user';
import React, { useState } from 'react';
import { menus } from '../components/menuList';

const MainPage = () => {
  const [currMenuId, setCurrMenuId] = useState('TMMA0010');
  const { user } = useSelector(({ userInfo }) => ({
    user: userInfo.userInfo,
  }));
  
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const onClick = (e) => {
    setCurrMenuId(e.target.value);
  };

  const Menu = menus[currMenuId];

  return (
    <>
      {user ? (
        <div style={{ height: '100%' }}>
          This is mainpage. <b>ID: {user.userIdxx}</b>
          <Button type="submit" onClick={onLogout}>
            Logout
          </Button>
          <div>
            <Button name="currMenu" value="TMMA0010" onClick={onClick}>
              공통코드관리
            </Button>
            <Button name="currMenu" value="TMMA0012" onClick={onClick}>
              세부코드관리
            </Button>
          </div>
          <Menu />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default MainPage;
