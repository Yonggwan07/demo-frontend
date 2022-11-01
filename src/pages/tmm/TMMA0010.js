import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search, unloadData } from '../../modules/transaction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComCompArea from '../../components/common/ComCompArea';
import { useForm } from 'react-hook-form';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import { addCommonCode } from '../../modules/commonCode';
import { gridInit } from '../../components/common/GridComponents';
import { getFirstDateOfMonth, getToday } from '../../utils/dateUtil';

const MENU_ID = 'tmma0010';
const codeOptions = [
  { commCode: 'SYST_CODE', usexYsno: '1' },
  { commCode: 'CDGB_CODE', usexYsno: '1' },
  { commCode: 'REXT_CODE', usexYsno: '1' },
];

// 그리드 컬럼 설정
const COL = [
  {
    field: 'COMM_CODE',
    headerName: '공통코드',
    width: 150,
  },
  {
    field: 'COMM_CDNM',
    headerName: '공통코드명',
    flex: 1,
    editable: true,
  },
  {
    field: 'SYST_CODE',
    headerName: '시스템구분',
    width: 150,
    compType: 'select',
    editable: true,
  },
  { field: 'CDGB_CODE', headerName: '코드구분' },
  { field: 'COCD_LNTH', headerName: '세부코드길이' },
  { field: 'ISET_YSNO', headerName: '초기세팅여부' },
  { field: 'RE1F_DESC', headerName: '보조1필드설명' },
  { field: 'RE1T_CODE', headerName: '보조1필드입력형태코드' },
  { field: 'RE2F_DESC', headerName: '보조2필드설명' },
  { field: 'RE2T_CODE', headerName: '보조2필드입력형태코드' },
  { field: 'RE3F_DESC', headerName: '보조3필드설명' },
  { field: 'RE3T_CODE', headerName: '보조3필드입력형태코드' },
  { field: 'RE4F_DESC', headerName: '보조4필드설명' },
  { field: 'RE4T_CODE', headerName: '보조4필드입력형태코드' },
  { field: 'RE5F_DESC', headerName: '보조5필드설명' },
  { field: 'RE5T_CODE', headerName: '보조5필드입력형태코드' },
  { field: 'RE6F_DESC', headerName: '보조6필드설명' },
  { field: 'RE6T_CODE', headerName: '보조6필드입력형태코드' },
  { field: 'RE7F_DESC', headerName: '보조7필드설명' },
  { field: 'RE7T_CODE', headerName: '보조7필드입력형태코드' },
  { field: 'RE8F_DESC', headerName: '보조8필드설명' },
  { field: 'RE8T_CODE', headerName: '보조8필드입력형태코드' },
  { field: 'RE9F_DESC', headerName: '보조9필드설명' },
  { field: 'RE9T_CODE', headerName: '보조9필드입력형태코드' },
  { field: 'R10F_DESC', headerName: '보조10필드설명' },
  { field: 'R10T_CODE', headerName: '보조10필드입력형태코드' },
  { field: 'REMK_100X', headerName: '비고' },
];

const TMMA0010 = () => {
  const [rows, setRows] = useState([]); // grid row
  const [columns, setColumns] = useState([]); // grid column

  const tableForm = useForm(); // 우측 테이블 form

  const { tData, commCode } = useSelector(({ transaction, commonCode }) => ({
    tData: transaction,
    commCode: commonCode.storedCommonCode,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    setColumns(gridInit(COL, commCode, tableForm));
  }, [commCode, tableForm]);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
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

  /* 입력 버튼 클릭 */
  const onInsert = useCallback(() => {
    console.log('Insert');
  }, []);

  /* 저장 버튼 클릭 */
  const onSave = useCallback(() => {
    console.log('Save');
  }, []);

  /* 그리드 행 클릭 */
  const onRowClickHandler = (params) => {
    for (const key in columns) {
      tableForm.setValue(columns[key].field, params.row[columns[key].field]);
    }
  };

  /* 조회 데이터 처리 */
  useEffect(() => {
    if (tData.data && tData.menuId === MENU_ID && tData.workId === 'search00') {
      setRows(tData.data);
      dispatch(unloadData());
    }
  }, [dispatch, tData]);

  /* 공통코드 조회 */
  useEffect(() => {
    let searchArr = [];

    codeOptions.forEach((element) => {
      let isExist = false;
      if (commCode.hasOwnProperty(element.commCode)) {
        isExist = true;
      }

      if (!isExist) {
        searchArr.push(element);
      }
    });

    if (searchArr.length > 0) {
      dispatch(
        search({
          menuId: 'comCombo',
          workId: 'getCombo',
          params: searchArr,
        }),
      );
    }
  }, [commCode, dispatch]);

  /* 조회된 공통코드 처리 */
  useEffect(() => {
    if (
      tData.data &&
      tData.menuId === 'comCombo' &&
      tData.workId === 'getCombo'
    ) {
      // Add to stored Combo
      dispatch(addCommonCode(tData.data));
      dispatch(unloadData());
    }
  }, [dispatch, tData]);

  // 조회조건 설정
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
      options: commCode.SYST_CODE,
      nullvalue: 'all', // all, select
      style: { width: '10rem' },
      //readOnly: true,
      //defaultValue: '공통관리',
    },
    {
      label: '조회일자',
      name: 'dateTest',
      type: 'dateToDate',
      valueFrom: getFirstDateOfMonth(),
      valueTo: getToday(),
      style: { width: '6.5rem', textAlign: 'center' },
      required: true,
    },
    {
      label: '여부',
      name: 'chkTest',
      type: 'checkbox',
      //defaultValue: true,
      //readOnly: true
    },
    {
      label: '월',
      name: 'dayTest',
      type: 'yearToYear',
      valueTo: '2022',
      style: { width: '5rem', textAlign: 'center' },
    },
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
        <div className="gridWrapper">
          <DataGrid
            columns={columns}
            rows={rows == null ? [] : rows}
            components={{
              Toolbar: GridToolbar,
            }}
            onRowClick={onRowClickHandler}
            //editMode="row"
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  CDGB_CODE: false,
                  COCD_LNTH: false,
                  ISET_YSNO: false,
                  RE1F_DESC: false,
                  RE1T_CODE: false,
                  RE2F_DESC: false,
                  RE2T_CODE: false,
                  RE3F_DESC: false,
                  RE3T_CODE: false,
                  RE4F_DESC: false,
                  RE4T_CODE: false,
                  RE5F_DESC: false,
                  RE5T_CODE: false,
                  RE6F_DESC: false,
                  RE6T_CODE: false,
                  RE7F_DESC: false,
                  RE7T_CODE: false,
                  RE8F_DESC: false,
                  RE8T_CODE: false,
                  RE9F_DESC: false,
                  RE9T_CODE: false,
                  R10F_DESC: false,
                  R10T_CODE: false,
                  REMK_100X: false,
                },
              },
            }}
          />
        </div>
        <ComCompArea direction="v">
          <div style={{ flex: 0 }}>
            <form onSubmit={tableForm.handleSubmit()}>
              <table className="workTable">
                <colgroup>
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>공통코드</th>
                    <td>
                      <input {...tableForm.register('COMM_CODE')} readOnly />
                    </td>
                    <th>공통코드명</th>
                    <td>
                      <input {...tableForm.register('COMM_CDNM')} required />
                    </td>
                  </tr>
                  <tr>
                    <th>시스템구분</th>
                    <td>
                      <Select
                        label="시스템구분"
                        name="SYST_CODE"
                        nullvalue="select"
                        options={commCode.SYST_CODE}
                        required={true}
                        form={tableForm}
                      />
                    </td>
                    <th>코드구분</th>
                    <td>
                      <Select
                        label="코드구분"
                        name="CDGB_CODE"
                        nullvalue="select"
                        options={commCode.CDGB_CODE}
                        required={true}
                        form={tableForm}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>세부코드길이</th>
                    <td>
                      <input {...tableForm.register('COCD_LNTH')} />
                    </td>
                    <th>초기세팅여부</th>
                    <td>
                      <Checkbox
                        label="초기세팅여부"
                        name="ISET_YSNO"
                        form={tableForm}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div>
            <form style={{ height: '100%' }}>
              <table className="workTable" style={{ height: '100%' }}>
                <colgroup>
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>입력형태</th>
                    <th>공통코드</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(9).keys()].map((i) => (
                    <tr key={i}>
                      <th>{'항목' + (i + 1)}</th>
                      <td>
                        <input {...tableForm.register(`RE${i + 1}F_DESC`)} />
                      </td>
                      <td>
                        <Select
                          label={`보조${i + 1}필드입력형태코드`}
                          name={`RE${i + 1}T_CODE`}
                          nullvalue="select"
                          options={commCode.REXT_CODE}
                          form={tableForm}
                        />
                      </td>
                      <td>
                        <input readOnly />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>항목10</th>
                    <td>
                      <input {...tableForm.register('R10F_DESC')} />
                    </td>
                    <td>
                      <Select
                        label="보조10필드입력형태코드"
                        name="R10T_CODE"
                        nullvalue="select"
                        options={commCode.REXT_CODE}
                        form={tableForm}
                      />
                    </td>
                    <td>
                      <input readOnly />
                    </td>
                  </tr>
                  <tr style={{ height: '100%' }}>
                    <th>비고</th>
                    <td colSpan={3}>
                      <textarea
                        {...tableForm.register('REMK_100X')}
                        style={{
                          height: 'calc(100% - 0.375rem)',
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </ComCompArea>
      </ComCompArea>
    </ComWorkframe>
  );
};

export default TMMA0010;
