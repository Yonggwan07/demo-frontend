import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../../modules/transaction';
import { DataGrid } from '@mui/x-data-grid';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';

const MENU_ID = 'tmma0012';

const searchItems = [
  // 모든 항목에 label, name 필수
  {
    label: '공통코드/명',
    name: 'COMM_CDNM',
    style: { width: '10rem' },
    maxLength: 9,
  },
];

const TMMA0012 = () => {
  const [searchParams, setSearchParams] = useState({
    commCdnm: '',
    systCode: '',
  });
  const [rows, setRows] = useState([]);

  const { tData } = useSelector(({ transaction }) => ({
    tData: transaction,
  }));

  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(
      search({
        menuId: MENU_ID,
        workId: 'search00',
        params: searchParams,
      }),
    );
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  useEffect(() => {
    if (tData.data && tData.menuId === MENU_ID && tData.workId === 'search00') {
      setRows(tData.data);
    } else {
      setRows([]);
    }
  }, [tData]);

  const columns = [
    { field: 'commCode', headerName: '0020_공통코드' },
    { field: 'commCdnm', headerName: '0020_공통코드명' },
    { field: 'systCode', headerName: '0020_시스템코드' },
    { field: 'cbdgCode', headerName: '0020_코드구분코드' },
    { field: 'cocdLnth', headerName: '0020_세부코드길이' },
    { field: 're1fDesc', headerName: '0020_보조1필드설명' },
    { field: 're2fDesc', headerName: '0020_보조2필드설명' },
    { field: 're3fDesc', headerName: '0020_보조3필드설명' },
    { field: 're4fDesc', headerName: '0020_보조4필드설명' },
    { field: 're5fDesc', headerName: '0020_보조5필드설명' },
    { field: 're6fDesc', headerName: '0020_보조6필드설명' },
    { field: 'remk100x', headerName: '0020_비고100' },
  ];

  return (
    <ComWorkframe>
      {/* <input
        name="commCdnm"
        placeholder="공통코드명"
        onChange={onChange}
        value={searchParams.commCdnm}
      />
      <input
        name="systCode"
        placeholder="시스템코드"
        onChange={onChange}
        value={searchParams.systCode}
      /> */}
      <ComWorkTitleArea id={MENU_ID} title="세부코드관리" search={onSearch} />
      <ComSearchArea props={searchItems} />
      <div style={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </ComWorkframe>
  );
};

export default TMMA0012;
