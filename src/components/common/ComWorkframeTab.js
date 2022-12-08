import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import { GridRowState } from '../../hooks/useGrid';
import handleBackdrop from '../../lib/api/backdrop';
import openSnackbar from '../../lib/api/snackbar';
import { transaction } from '../../lib/api/transaction';
import { constStr } from '../../utils/constStr';
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
        } else {
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const search = useCallback((menuId, workId, params, useSnackbar = true) => {
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
            openSnackbar(constStr.postSearch(res.data.length));
          }
          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          if (useSnackbar) {
            openSnackbar(constStr.errorSearch, 'error');
          }
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const save = useCallback((menuId, workId, data) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      transaction({
        menuId: menuId,
        workId: workId,
        params: data,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postSave(res.data));
          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSave, 'error');
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const remove = useCallback((menuId, workId, data) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      const _data = data.map((item) => (item.state = GridRowState.deleted));
      transaction({
        menuId: menuId,
        workId: workId,
        params: _data,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postDelete(res.data));
          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorDelete, 'error');
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{
        position: 'absolute',
        top: '101px',
        width: '100%',
        height: 'calc(100% - 3.25rem - 3rem - 1px)',
        zIndex: value === index ? '1' : '9999',
        padding: '1rem',
      }}
    >
      <Suspense>
        <Menu getCombo={getCombo} search={search} save={save} remove={remove} />
      </Suspense>
    </div>
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
