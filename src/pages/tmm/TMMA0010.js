import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useCallback, useEffect, useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import Checkbox from '../../components/common/Checkbox';
import ComCompArea from '../../components/common/ComCompArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import { gridInit } from '../../components/common/GridComponents';
import Select from '../../components/common/Select';
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

const TMMA0010 = ({ getCombo, search }) => {
  const [comCombo, setComCombo] = useState({});
  const [rows, setRows] = useState([]); // grid row
  const [currentRowId, setCurrentRowId] = useState('');
  const [changedRows, setChangedRows] = useState([]);
  const [columns, setColumns] = useState([]); // grid column
  const [origData, setOrigData] = useState([]);

  const tableForm = useForm(); // 우측 테이블 form

  /* Page Init */
  useEffect(() => {
      getCombo(codeOptions).then((res) => {
        setComCombo(res);
        setColumns(gridInit(COL, res, tableForm));
      });
  }, [tableForm, getCombo]);

  /* 조회 버튼 클릭 */
  const search00 = useCallback(
    (data) => {
      search(MENU_ID, 'search00', data)
        .then((res) => {
          setRows(res);
          setOrigData(res);
        })
        .catch(() => {
          setRows([]);
          setOrigData([]);
        });
    },
    [search],
  );

  /* 입력 버튼 클릭 */
  const onInsert = useCallback(() => {
    console.log('Insert');
  }, []);

  /* 저장 버튼 클릭 */
  /*
  const onSave = useCallback(() => {
    dispatch(save({ menuId: MENU_ID, workId: 'save00', data: changedRows }));
  }, [changedRows, dispatch]);
  */
  const onSave = () => {};

  const onChangeTableValue = (e) => {
    tableForm.setValue(e.target.name, e.target.value);
    const formData = tableForm.watch();

    const modifiedRows = rows.map((row) => {
      if (row.id === currentRowId) {
        // 변경된 row 배열에 이미 존재하는 항목인지 확인
        if (
          changedRows.find((changedRow) => {
            return changedRow.id === currentRowId;
          })
        ) {
          // 원본 데이터와 비교하여 수정된 값이 원본과 같을 경우
          // 변경된 row 배열에서 제거
          const orig = origData.find((data) => data.id === currentRowId);
          let isSame = true;
          for (const [key, value] of Object.entries(formData)) {
            if (value !== orig[key] && !(value === '' && orig[key] === null)) {
              isSame = false;
              break;
            }
          }
          if (isSame) {
            const newChangedRows = changedRows.filter(
              (cRow) => cRow.id !== row.id,
            );
            setChangedRows(newChangedRows);
          } else {
            // 이미 존재하는 항목인 경우 기존 항목 대체
            const newChangedRows = changedRows.map((cRow) => {
              return row.id === cRow.id
                ? {
                    ...formData,
                    id: row.id,
                    state: row.state !== 'i' ? 'm' : row.state,
                  }
                : cRow;
            });
            setChangedRows(newChangedRows);
          }
        } else {
          // 새로 변경된 항목인 경우 변경된 row 배열에 추가
          setChangedRows([
            ...changedRows,
            { ...formData, id: row.id, state: 'm' },
          ]);
        }
        return { ...formData, id: row.id };
      } else {
        return row;
      }
    });
    setRows(modifiedRows);
  };

  /* 그리드 행 클릭 */
  const onRowClickHandler = (e) => {
    setCurrentRowId(e.id);
    for (const key in columns) {
      tableForm.setValue(columns[key].field, e.row[columns[key].field]);
    }
  };

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
      options: comCombo.SYST_CODE,
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
      <ComSearchArea
        onSubmit={search00}
        props={searchItems}
        menuId={MENU_ID}
      />
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
                      <input
                        {...tableForm.register('COMM_CDNM')}
                        required
                        onChange={onChangeTableValue}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>시스템구분</th>
                    <td>
                      <Select
                        label="시스템구분"
                        name="SYST_CODE"
                        nullvalue="select"
                        options={comCombo.SYST_CODE}
                        required={true}
                        form={tableForm}
                        onChange={onChangeTableValue}
                      />
                    </td>
                    <th>코드구분</th>
                    <td>
                      <Select
                        label="코드구분"
                        name="CDGB_CODE"
                        nullvalue="select"
                        options={comCombo.CDGB_CODE}
                        required={true}
                        form={tableForm}
                        onChange={onChangeTableValue}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>세부코드길이</th>
                    <td>
                      <input
                        {...tableForm.register('COCD_LNTH')}
                        onChange={onChangeTableValue}
                      />
                    </td>
                    <th>초기세팅여부</th>
                    <td>
                      <Checkbox
                        label="초기세팅여부"
                        name="ISET_YSNO"
                        form={tableForm}
                        onChange={onChangeTableValue}
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
                        <input
                          {...tableForm.register(`RE${i + 1}F_DESC`)}
                          onChange={onChangeTableValue}
                        />
                      </td>
                      <td>
                        <Select
                          label={`보조${i + 1}필드입력형태코드`}
                          name={`RE${i + 1}T_CODE`}
                          nullvalue="select"
                          options={comCombo.REXT_CODE}
                          form={tableForm}
                          onChange={onChangeTableValue}
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
                      <input
                        {...tableForm.register('R10F_DESC')}
                        onChange={onChangeTableValue}
                      />
                    </td>
                    <td>
                      <Select
                        label="보조10필드입력형태코드"
                        name="R10T_CODE"
                        nullvalue="select"
                        options={comCombo.REXT_CODE}
                        form={tableForm}
                        onChange={onChangeTableValue}
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
                        onChange={onChangeTableValue}
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

export default memo(TMMA0010);
