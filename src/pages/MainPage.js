import LoginPage from './LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import { logout } from '../modules/user';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { search } from '../modules/transaction';

const MainPage = () => {
  const [rows, setRows] = useState([]);
  const { user, data } = useSelector(({ userInfo, transaction }) => ({
    user: userInfo.userInfo,
    data: transaction.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const onSearch = () => {
    dispatch(
      search({
        menuId: 'tmma0010',
        workId: 'search00',
        params: { COMM_CDNM: '' },
      }),
    );
  };

  useEffect(() => {
    setRows(data == null ? [] : data);
  }, [data]);

  const columns = [
    { field: 'commCode', headerName: '공통코드' },
    { field: 'commCdnm', headerName: '공통코드명' },
    { field: 'systCode', headerName: '시스템코드' },
    { field: 'cbdgCode', headerName: '코드구분코드' },
    { field: 'cocdLnth', headerName: '세부코드길이' },
    { field: 're1fDesc', headerName: '보조1필드설명' },
    { field: 're2fDesc', headerName: '보조2필드설명' },
    { field: 're3fDesc', headerName: '보조3필드설명' },
    { field: 're4fDesc', headerName: '보조4필드설명' },
    { field: 're5fDesc', headerName: '보조5필드설명' },
    { field: 're6fDesc', headerName: '보조6필드설명' },
    { field: 'remk100x', headerName: '비고100' },
  ];

  return (
    <>
      {user ? (
        <div style={{ height: '100%' }}>
          This is mainpage. <b>ID: {user.userIdxx}</b>
          <Button onClick={onLogout}>Logout</Button>
          <Button onClick={onSearch}>Search</Button>
          <div style={{ height: 500 }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default MainPage;
