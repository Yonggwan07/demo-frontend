import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ComCheckbox from '../../components/common/ComCheckbox';
import ComCompArea from '../../components/common/ComCompArea';
import ComDatagrid from '../../components/common/ComDatagrid';
import ComFormTable from '../../components/common/ComFormTable';
import ComInput from '../../components/common/ComInput';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComSearchPopup from '../../components/common/ComSearchPopup';
import ComSelect from '../../components/common/ComSelect';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import ComWrapperVertical from '../../components/common/ComWrapperVertical';
import handleDialog from '../../lib/api/dialog';
import { gridInit, GridRowState } from '../../utils/gridUtil';

const codeOptions = [
  { commCode: 'SYST_CODE', usexYsno: '1' },
  { commCode: 'CDGB_CODE', usexYsno: '1' },
  { commCode: 'REXT_CODE', usexYsno: '1' },
];

// 그리드 컬럼 설정
const columnInfo = [
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

const ConditionalCommCodeField = ({ ...props }) => {
  const state = useWatch({
    control: props.control,
    name: 'state',
  });

  return (
    <ComInput
      control={props.control}
      name="COMM_CODE"
      InputProps={{
        readOnly: state !== GridRowState.inserted,
      }}
      required
    />
  );
};

const ConditionalSearchPopup = ({ ...props }) => {
  const codeValue = useWatch({
    control: props.control,
    name: `${props.code.substr(0, 3)}T_CODE`,
  });

  return (
    <ComSearchPopup
      {...props}
      disabled={codeValue !== '01'}
      required={codeValue === '01'}
    />
  );
};

const TMMA0011 = ({ menuInfo, getCombo, search, save, remove }) => {
  const [comCombo, setComCombo] = useState({});
  const { handleSubmit, reset, getValues, control } = useForm(); // 우측 테이블 form
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    console.log('render');
  }, []);

  /* Page Init */
  useEffect(() => {
    getCombo(codeOptions).then((res) => {
      setComCombo(res);
      setColumns(gridInit(columnInfo, res));
    });
  }, [getCombo]);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      console.log(data);
      search(menuInfo.id, 'search00', data)
        .then((res) => {
          setRows(res);
          setSelectionModel('1');
        })
        .catch(() => {
          setRows([]);
        });
    },
    [menuInfo.id, search],
  );

  /* 입력 버튼 클릭 */
  const onInsert = () => {
    const newId = (parseInt(rows[rows.length - 1].id) + 1).toString();
    const newRow = {
      id: newId,
      state: GridRowState.inserted,
    };
    setRows((prev) => [...prev, newRow]);
    setSelectionModel(newId);
  };

  /* 저장 버튼 클릭 */
  const onSave = (data) => {
    console.log('--- Save ---');
    console.log(data);
    save(menuInfo.id, 'save00', [data]).then(() => {
      setRows(rows.map((row) => (row.id === data.id ? data : row)));
      reset({}, { keepValues: true });
    });
  };

  /* 삭제 버튼 클릭 */
  const onRemove = () => {
    const data = getValues();
    console.log('--- Remove ---');
    console.log(data);
    remove(menuInfo.id, 'save00', [data]).then(() => {
      setRows(rows.filter((row) => row.id !== data.id));
      reset({}, { keepValues: true });
    });
  };

  // 조회조건 설정
  const searchItems = useMemo(
    () => [
      // 모든 항목에 label, name 필수
      {
        label: '공통코드/명',
        name: 'COMM_CDNM',
        style: { width: '10rem' },
        //defaultValue: 'ACCT',
        //required: true,
        //maxLength: 9,
        //minLength: 4
      },
      {
        label: '시스템코드',
        name: 'SYST_CODE',
        type: 'select',
        options: comCombo.SYST_CODE,
        nullvalue: 'all', // all, select
        style: { width: '10rem' },
        // readOnly: true,
        // disabled: true
        //defaultValue: 'TMM',
        //required: true,
      },
      // {
      //   label: '조회일자',
      //   name: 'dateTest',
      //   type: 'dateRange',
      //   from: '2022-12-01',
      //   to: '2022-12-10',
      //   //style: { width: '10rem' },
      //   //required: {
      //   //  from: true,
      //   //  to: true,
      //   //},
      //   //minDate: '2022-12-01',
      //   //maxDate: '2022-12-20',
      // },
      // {
      //   label: '여부',
      //   name: 'chkTest',
      //   type: 'checkbox',
      //   defaultValue: true,
      //   //disabled: true,
      // },
      // {
      //   label: '일자',
      //   name: 'dateSingle',
      //   type: 'date',
      //   currentDate: '2022-12-10',
      //   required: true,
      //   minDate: '2022-12-01',
      // },
    ],
    [comCombo.SYST_CODE],
  );

  return (
    <ComWorkframe>
      <ComWorkTitleArea menuInfo={menuInfo} />
      <ComSearchArea onSubmit={handleSearch} searchItems={searchItems} />
      <ComCompArea>
        <ComDatagrid
          rows={rows}
          columns={columns}
          reset={reset}
          selectionModel={selectionModel}
          setSelectionModel={setSelectionModel}
          commonButtons={{ insert: { onClick: onInsert } }}
          disableMultipleSelection
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
        <ComWrapperVertical>
          <ComFormTable
            onSubmit={handleSubmit(onSave)}
            control={control}
            commonButtons={{
              cancel: {
                onClick: () => {
                  reset();
                },
              },
              save: { type: 'submit' },
              remove: {
                onClick: () =>
                  handleDialog(
                    'remove',
                    `공통코드: ${getValues(
                      'COMM_CODE',
                    )} 항목을 삭제하시겠습니까?`,
                    () => onRemove,
                  ),
              },
            }}
          >
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell variant="head">공통코드</TableCell>
                    <TableCell>
                      <ConditionalCommCodeField
                        control={control}
                        name="COMM_CODE"
                        required
                      />
                    </TableCell>
                    <TableCell variant="head">공통코드명</TableCell>
                    <TableCell>
                      <ComInput control={control} name="COMM_CDNM" required />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">시스템구분</TableCell>
                    <TableCell>
                      <ComSelect
                        control={control}
                        name="SYST_CODE"
                        options={comCombo.SYST_CODE}
                        nullvalue="select"
                        required
                      />
                    </TableCell>
                    <TableCell variant="head">코드구분</TableCell>
                    <TableCell>
                      <ComSelect
                        control={control}
                        name="CDGB_CODE"
                        options={comCombo.CDGB_CODE}
                        nullvalue="select"
                        required
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">세부코드길이</TableCell>
                    <TableCell>
                      <ComInput
                        control={control}
                        name="COCD_LNTH"
                        type="number"
                      />
                    </TableCell>
                    <TableCell variant="head">초기세팅여부</TableCell>
                    <TableCell>
                      <ComCheckbox control={control} name="ISET_YSNO" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{ flex: 1 }}>
              <Table size="small" sx={{ height: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>구분</TableCell>
                    <TableCell sx={{ width: '25%' }}>제목</TableCell>
                    <TableCell sx={{ width: '20%' }}>입력형태</TableCell>
                    <TableCell sx={{ width: '45%' }}>공통코드</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(9).keys()].map((i) => (
                    <TableRow key={i}>
                      <TableCell variant="head">{'항목' + (i + 1)}</TableCell>
                      <TableCell>
                        <ComInput control={control} name={`RE${i + 1}F_DESC`} />
                      </TableCell>
                      <TableCell>
                        <ComSelect
                          control={control}
                          name={`RE${i + 1}T_CODE`}
                          nullvalue="select"
                          options={comCombo.REXT_CODE}
                        />
                      </TableCell>
                      <TableCell>
                        <ConditionalSearchPopup
                          control={control}
                          code={`RE${i + 1}F_CMCD`}
                          name={`RE${i + 1}F_CMNM`}
                          popupid="TMM1003"
                          search={search}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell variant="head">항목10</TableCell>
                    <TableCell>
                      <ComInput control={control} name="R10F_DESC" />
                    </TableCell>
                    <TableCell>
                      <ComSelect
                        control={control}
                        name="R10T_CODE"
                        nullvalue="select"
                        options={comCombo.REXT_CODE}
                      />
                    </TableCell>
                    <TableCell>
                      <ConditionalSearchPopup
                        control={control}
                        code="R10F_CMCD"
                        name="R10F_CMNM"
                        popupid="TMM1003"
                        search={search}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ height: '100%' }}>
                    <TableCell variant="head">비고</TableCell>
                    <TableCell colSpan={3}>
                      <ComInput
                        control={control}
                        name="REMK_100X"
                        multiline
                        rows={6}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ComFormTable>
        </ComWrapperVertical>
      </ComCompArea>
    </ComWorkframe>
  );
};

export default memo(TMMA0011);
