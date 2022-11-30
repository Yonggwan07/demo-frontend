import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import handleBackdrop from '../../lib/api/backdrop';
import openSnackbar from '../../lib/api/snackbar';
import { transaction } from '../../lib/api/transaction';
import { jsonKeyUpperCase } from '../../utils/dataUtil';

const TabPanel = memo(function TabPanel(props) {
  const { children, value, index, menuId, ...other } = props;
  const Menu = useMemo(
    () =>
      lazy(() =>
        import(`../../pages/${menuId.substring(0, 3).toLowerCase()}/${menuId}`),
      ),
    [menuId],
  );

  const getCombo = useCallback((codeOptions) => {
    return new Promise((resolve, reject) => {
      transaction({
        menuId: 'comCombo',
        workId: 'getCombo',
        params: codeOptions,
      }).then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
      });
    });
  }, []);

  const search = useCallback(
    (menuId, workId, params, useSnackbar = true) => {
      return new Promise((resolve, reject) => {
        handleBackdrop(true);
        transaction({
          menuId: menuId,
          workId: workId,
          params: params,
        }).then((res) => {
          if (res.status === 200) {
            handleBackdrop(false);
            if (useSnackbar) {
              openSnackbar(`${res.data.length}건이 조회되었습니다.`);
            }
            resolve(jsonKeyUpperCase(res.data));
          } else {
            handleBackdrop(false);
            if (useSnackbar) {
              openSnackbar(`조회에 실패했습니다.`);
            }
            console.error(res);
            return reject();
          }
        });
      });
    },
    [],
  );

  const save = useCallback(
    (menuId, workId, data) => {
      return new Promise((resolve, reject) => {
        handleBackdrop(true);
        transaction({
          menuId: menuId,
          workId: workId,
          params: data,
        }).then((res) => {
          if (res.status === 200) {
            handleBackdrop(false);
            openSnackbar(`${res.data}건이 처리되었습니다.`);
            resolve(jsonKeyUpperCase(res.data));
          } else {
            handleBackdrop(false);
            openSnackbar(`저장에 실패했습니다.`, 'error');
            console.error(res);
            return reject();
          }
        });
      });
    },
    [],
  );

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
        style={{
          position: 'absolute',
          top: '101px',
          width: 'calc(100% - 2rem)',
          height: 'calc(100% - 133px)',
          zIndex: value === index ? '1' : '9999',
          padding: '1rem',
        }}
      >
        <Suspense>
          <Menu getCombo={getCombo} search={search} save={save} />
        </Suspense>
      </div>
    </>
  );
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ComWorkframeTab = ({ tabs, tabValue, setTabValue }) => {
  const handleChange = useCallback(
    (_e, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  return (
    <div style={{ height: 'calc(100% - 3.25rem)' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {tabs.map(({ index, label, menuId }) => (
            <Tab key={menuId} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ index, menuId }) => (
        <TabPanel key={menuId} value={tabValue} index={index} menuId={menuId} />
      ))}
    </div>
  );
};

export default ComWorkframeTab;
