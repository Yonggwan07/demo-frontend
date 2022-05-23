import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  search,
  setTransactionId,
  unloadData,
} from '../../modules/transaction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComCompArea from '../../components/common/ComCompArea';

const MENU_ID = 'tmma0010';
const searchedCombo = { commCode: 'SYST_CODE', usexYsno: '1' };

const TMMA0010 = () => {
  const [combo, setCombo] = useState([]);
  const [rows, setRows] = useState([]); // 그리드 데이터

  const { tData } = useSelector(({ transaction }) => ({
    tData: transaction,
  }));

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (data) => {
      dispatch(setTransactionId({ menuId: MENU_ID, workId: 'search00' }));
      dispatch(
        search({
          menuId: MENU_ID,
          workId: 'search00',
          params: data,
        }),
      );

      return () => {
        dispatch(unloadData());
      };
    },
    [dispatch],
  );

  const onInsert = useCallback(() => {
    console.log('Insert');
  }, []);
  const onSave = useCallback(() => {
    console.log('Save');
  }, []);

  // const onChangeSearchParams = useCallback(
  //   (e) => {
  //     const { value, name } = e.target;
  //     setSearchParams({ ...searchParams, [name]: value });
  //   },
  //   [searchParams],
  // );

  const onRowClickHandler = (params) => {
    console.log(params);
  };

  useEffect(() => {
    if (tData.data && tData.menuId === MENU_ID && tData.workId === 'search00') {
      setRows(tData.data);
    }
  }, [tData]);

  useEffect(() => {
    if (
      tData.data &&
      tData.menuId === 'comCombo' &&
      tData.workId === 'getCombo'
    ) {
      setCombo(tData.data);
    }
  }, [tData]);

  useEffect(() => {
    dispatch(setTransactionId({ menuId: 'comCombo', workId: 'getCombo' }));
    dispatch(
      search({
        menuId: 'comCombo',
        workId: 'getCombo',
        params: searchedCombo,
      }),
    );
  }, [dispatch]);

  // 조회조건 설정
  const searchItems = [
    // 모든 항목에 label, name 필수
    {
      label: '공통코드/명',
      name: 'commCdnm',
      style: { width: '10rem' },
      maxLength: 9,
    },
    {
      label: '시스템코드',
      name: 'systCode',
      type: 'select',
      options: combo,
      nullvalue: 'all', // all, select
      style: { width: '10rem' },
    },
    {
      label: '조회일자',
      name: 'dateTest',
      type: 'dateToDate',
      valueFrom: '2022-05-22',
      valueTo: '2022-05-31',
      style: { width: '6.5rem', textAlign: 'center' },
      required: true,
      
    },
    {
      label: '여부',
      name: 'chkTest',
      type: 'checkbox',
    },
    {
      label: '월',
      name: 'dayTest',
      type: 'yearToYear',
      valueTo: '2022',
      style: { width: '5rem', textAlign: 'center' },
    },
  ];

  // 그리드 컬럼 설정
  const columns = [
    {
      field: 'commCode',
      headerName: '공통코드',
      width: 150,
    },
    { field: 'commCdnm', headerName: '공통코드명', width: 200 },
    { field: 'systCode', headerName: '시스템코드' },
    { field: 'cbdgCode', headerName: '코드구분코드' },
    { field: 'cocdLnth', headerName: '세부코드길이' },
    {
      field: 're1fDesc',
      headerName: '보조1필드설명',
      width: 200,
      editable: true,
    },
    {
      field: 're2fDesc',
      headerName: '보조2필드설명',
      width: 200,
      editable: true,
    },
    {
      field: 're3fDesc',
      headerName: '보조3필드설명',
      width: 200,
      editable: true,
    },
    {
      field: 're4fDesc',
      headerName: '보조4필드설명',
      width: 200,
      editable: true,
    },
    {
      field: 're5fDesc',
      headerName: '보조5필드설명',
      width: 200,
      editable: true,
    },
    {
      field: 're6fDesc',
      headerName: '보조6필드설명',
      width: 200,
      editable: true,
    },
    { field: 'remk100x', headerName: '비고100', width: 200, editable: true },
  ];

  return (
    <ComWorkframe>
      <ComWorkTitleArea
        id={MENU_ID}
        title="공통코드관리"
        search
        insert={onInsert}
        save={onSave}
      />
      <ComSearchArea onSubmit={handleSearch} props={searchItems} />
      <ComCompArea>
        <DataGrid
          columns={columns}
          rows={rows == null ? [] : rows}
          components={{
            Toolbar: GridToolbar,
          }}
          onRowClick={onRowClickHandler}
          editMode="row"
        />
        <ComCompArea direction='v'>
          <div style={{border: '1px solid black'}}>aaa</div>
          <div style={{border: '1px solid black'}}>bbb</div>
        </ComCompArea>
      </ComCompArea>
    </ComWorkframe>
  );
};

export default TMMA0010;
