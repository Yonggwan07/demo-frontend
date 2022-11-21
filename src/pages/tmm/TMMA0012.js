import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';

const MENU_ID = 'tmma0012';
const codeOptions = [
  { commCode: 'SYST_CODE', usexYsno: '1' },
  { commCode: 'CDGB_CODE', usexYsno: '1' },
];

const TMMA0012 = ({ getCombo, search }) => {
  const [searchParams, setSearchParams] = useState({
    commCdnm: '',
    systCode: '',
  });
  const [comCombo, setComCombo] = useState({});
  const [rows, setRows] = useState([]);
  const form = useForm();

  useEffect(() => {
    getCombo(codeOptions).then((res) => {
      setComCombo(res);
      //setColumns(gridInit(COL, res, tableForm));
    });
  }, [getCombo]);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      search(MENU_ID, 'search00', data)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          console.log('transaction error.');
        });
    },
    [search],
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

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

  const searchItems = [
    // 모든 항목에 label, name 필수
    {
      label: '공통코드/명',
      name: 'COMM_CDNM',
      style: { width: '10rem' },
      maxLength: 9,
    },
    {
      label: '시스템코드',
      name: 'SYST_CODE',
      type: 'select',
      options: comCombo.SYST_CODE,
      nullvalue: 'all', // all, select
      style: { width: '10rem' },
      //readOnly: true,
      //defaultValue: '공통관리',
    },
  ];

  return (
    <ComWorkframe>
      <ComWorkTitleArea id={MENU_ID} title="세부코드관리" search />
      <ComSearchArea
        onSubmit={handleSearch}
        props={searchItems}
        menuId={MENU_ID}
      />
      <div style={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </ComWorkframe>
  );
};

export default memo(TMMA0012);
