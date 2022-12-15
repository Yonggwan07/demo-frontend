import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ComSideMenuList = ({ tabs, setTabs, setTabValue, open, setOpen }) => {
  const { menuList } = useSelector(({ menuList }) => ({
    menuList: menuList.menuList,
  }));

  const handleClose = () => {
    setOpen(false);
  };

  // List
  const [menuOpen, setMenuOpen] = useState({});
  const handleCollapsableMenuClick = useCallback(
    (menuIdxx) => {
      setMenuOpen({ ...menuOpen, [menuIdxx]: !menuOpen[menuIdxx] });
    },
    [menuOpen],
  );
  const handleWorkMenuClick = useCallback(
    (progIdxx, menuName) => {
      if (tabs.find((tab) => tab.menuId === progIdxx) === undefined) {
        setTabs((tabs) =>
          tabs.concat({
            menuId: progIdxx,
            label: menuName,
          }),
        );
        setTabValue(progIdxx);
      } else {
        setTabValue(tabs.find((tab) => tab.menuId === progIdxx).menuId);
      }
      setOpen(false);
    },
    [setOpen, setTabValue, setTabs, tabs],
  );

  useEffect(() => {
    menuList
      .filter(
        (menuItem) => menuItem.menuLevl === '2' || menuItem.menuLevl === '3',
      )
      .forEach((menuItem) =>
        setMenuOpen((prev) => ({ ...prev, [menuItem.menuIdxx]: false })),
      );
  }, [menuList]);

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <Box sx={{ p: '1rem' }}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <List component="nav">
        {menuList &&
          /* Level 2 */
          menuList
            .filter((menuItem) => menuItem.menuLevl === '2')
            .map((menuItemLevel2) => (
              <div key={menuItemLevel2.menuIdxx}>
                <ListItemButton
                  onClick={() =>
                    handleCollapsableMenuClick(menuItemLevel2.menuIdxx)
                  }
                >
                  <ListItemText
                    primary={menuItemLevel2.menuName}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                  {menuOpen[menuItemLevel2.menuIdxx] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={menuOpen[menuItemLevel2.menuIdxx]}
                  timeout="auto"
                  unmountOnExit
                >
                  {
                    /* Level 3 */
                    menuList
                      .filter(
                        (menuItemLevel3) =>
                          menuItemLevel3.menuLevl === '3' &&
                          menuItemLevel3.upmeIdxx === menuItemLevel2.menuIdxx,
                      )
                      .map((menuItemLevel3) => (
                        <div key={menuItemLevel3.menuIdxx}>
                          <ListItemButton
                            onClick={() =>
                              handleCollapsableMenuClick(
                                menuItemLevel3.menuIdxx,
                              )
                            }
                          >
                            <ListItemText
                              primary={menuItemLevel3.menuName}
                              primaryTypographyProps={{ variant: 'h6' }}
                            />
                            {menuOpen[menuItemLevel3.menuIdxx] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                          <Collapse
                            in={menuOpen[menuItemLevel3.menuIdxx]}
                            timeout="auto"
                            unmountOnExit
                          >
                            {
                              /* Level 4 */
                              menuList
                                .filter(
                                  (menuItemLevel4) =>
                                    menuItemLevel4.menuLevl === '4' &&
                                    menuItemLevel4.upmeIdxx ===
                                      menuItemLevel3.menuIdxx,
                                )
                                .map((menuItemLevel4) => (
                                  <div key={menuItemLevel4.menuIdxx}>
                                    <ListItemButton
                                      onClick={() =>
                                        handleWorkMenuClick(
                                          menuItemLevel4.progIdxx,
                                          menuItemLevel4.menuName,
                                        )
                                      }
                                    >
                                      <ListItemText
                                        primary={menuItemLevel4.menuName}
                                        primaryTypographyProps={{
                                          variant: 'subtitle1',
                                        }}
                                      />
                                    </ListItemButton>
                                  </div>
                                ))
                            }
                          </Collapse>
                        </div>
                      ))
                  }
                </Collapse>
              </div>
            ))}
      </List>
    </Drawer>
  );
};

export default memo(ComSideMenuList);
