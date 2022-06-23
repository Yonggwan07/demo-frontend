import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { menus } from '../menuList';

function TabPanel(props) {
  const { children, value, index, menuId, ...other } = props;
  const Menu = menus[menuId];

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
        <Menu />
      </div>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ComWorkframeTab = ({ tabs, tabValue, setTabValue }) => {
  const handleChange = (_e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ height: 'calc(100% - 3.25rem)' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map(({ index, label }) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              onClick={(e) => console.log(e)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ index, menuId }) => (
        <TabPanel key={index} value={tabValue} index={index} menuId={menuId} />
      ))}
    </div>
  );
};

export default ComWorkframeTab;
