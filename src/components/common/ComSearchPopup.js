import React, { memo, useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { PropTypes } from 'prop-types';
import { useController } from 'react-hook-form';
import { constStr } from '../../utils/constStr';
import ComSearchArea from './ComSearchArea';

const OBJECT_REG = /<([^>]+?)\/>/g;
const FIELD_REX = /[^\s]+/g;
const PROP_REX = `\\s*=\\s*"(.+?)"`;

const ComSearchPopup = ({ control, popupId, search, ...props }) => {
  const {
    field: codeField,
    fieldState: { error },
  } = useController({
    name: props.code,
    control,
    defaultValue: '',
    rules: { required: props.required ? constStr.required : false },
  });

  const { field: nameField } = useController({
    name: props.name,
    control,
    defaultValue: '',
  });

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [grid, setGrid] = useState({
    rows: [],
    columns: [],
    columnVisibilityModel: null,
  });

  const parseSearchItems = useCallback(
    (strData) => {
      let matches;
      while ((matches = OBJECT_REG.exec(strData)) !== null) {
        const newSearchItems = {};
        newSearchItems.name = matches[1].match(FIELD_REX)[0];
        newSearchItems.label = matches[1].match(
          new RegExp('value' + PROP_REX),
        )[1];

        const hiddenMatch = matches[1].match(new RegExp('hidden' + PROP_REX));
        newSearchItems.hidden = hiddenMatch
          ? JSON.parse(hiddenMatch[1])
          : false;

        const labelSizeMatch = matches[1].match(
          new RegExp('labelSize' + PROP_REX),
        );
        newSearchItems.style = {};
        newSearchItems.style.width = labelSizeMatch
          ? parseInt(matches[1].match(new RegExp('labelSize' + PROP_REX))[1]) *
              5 +
            'px'
          : '';

        newSearchItems.initialvalue = nameField.value;

        setSearchItems([...searchItems, newSearchItems]);
      }
    },
    [nameField.value, searchItems],
  );

  const parseColumns = (strData) => {
    let matches;
    let newColumns = [];
    let newColumnVisibilityModel = null;
    while ((matches = OBJECT_REG.exec(strData)) !== null) {
      const columnData = {};
      columnData.field = matches[1].match(FIELD_REX)[0];
      columnData.headerName = matches[1].match(
        new RegExp('value' + PROP_REX),
      )[1];

      const hiddenMatch = matches[1].match(new RegExp('hidden' + PROP_REX));
      if (hiddenMatch) {
        newColumnVisibilityModel = {
          ...newColumnVisibilityModel,
          [columnData.field]: !JSON.parse(hiddenMatch[1]),
        };
      }

      const labelSizeMatch = matches[1].match(
        new RegExp('labelSize' + PROP_REX),
      );
      columnData.width = labelSizeMatch
        ? parseInt(matches[1].match(new RegExp('labelSize' + PROP_REX))[1]) * 5
        : '';

      newColumns.push(columnData);
    }

    setGrid((prevState) => ({
      ...prevState,
      columns: newColumns,
      columnVisibilityModel: newColumnVisibilityModel,
    }));
  };

  const handleClose = useCallback(() => {
    setSearchItems([]);
    setGrid((prevState) => ({
      ...prevState,
      rows: [],
      columns: [],
      columnVisibilityModel: null,
    }));
    setOpen(false);
  }, []);

  const handleRowDoubleClick = useCallback(
    ({ row }) => {
      codeField.onChange(row.COMM_CODE);
      nameField.onChange(row.COMM_CDNM);
      handleClose();
    },
    [codeField, handleClose, nameField],
  );

  const handleSearch = useCallback(
    (data) => {
      search(
        'commonPopup',
        Object.assign(
          {
            POPP_XDAX: 'COMPOPUP.TMM1003',
          },
          data,
        ),
        'data',
        false,
      ).then((res) => {
        res = res.map(({ ID, ...rest }) => ({ id: ID, ...rest }));
        if (res.length === 1) {
          handleRowDoubleClick({
            row: {
              COMM_CODE: res[0].COMM_CODE,
              COMM_CDNM: res[0].COMM_CDNM,
            },
          });
        } else {
          setGrid((prevState) => ({ ...prevState, rows: res }));
          setOpen(true);
        }
      });
    },
    [handleRowDoubleClick, search],
  );

  const handleOpen = useCallback(() => {
    search('commonPopup', { popupId }, 'info', false).then((res) => {
      setTitle(res.popp_NAME);
      parseSearchItems(res.secn_SYNX);
      parseColumns(res.sers_GRDC);
      handleSearch({ COMM_CDNM: nameField.value });
    });
  }, [handleSearch, nameField.value, parseSearchItems, popupId, search]);

  const handleTextFieldChange = useCallback(
    (e) => {
      nameField.onChange(e.target.value);
      if (e.target.value === '') {
        codeField.onChange(e.target.value);
      }
    },
    [codeField, nameField],
  );

  return (
    <div
      disabled={props.disabled ? props.disabled : false}
      style={{ display: 'flex', alignItems: 'center', height: '100%' }}
    >
      <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <ComSearchArea onSubmit={handleSearch} searchItems={searchItems} />
          <DataGrid
            rows={grid.rows}
            columns={grid.columns}
            style={{ height: '500px' }}
            initialState={{
              columns: { columnVisibilityModel: grid.columnVisibilityModel },
            }}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip
        open={error === undefined ? false : true}
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={error?.message ? error.message : ''}
      >
        <TextField
          {...codeField}
          {...props}
          //style={{ height: '100%', flex: '0 1 auto' }}
          sx={{
            flex: 1,
            height: '1.5rem',
            '& .MuiInputBase-root': {
              height: '1.5rem',
              fontSize: '0.875rem',
            },
            '& .MuiOutlinedInput-input': {
              height: '1.5rem',
              padding: '0 14px',
            },
          }}
          error={error ? true : false}
          readOnly
          autoComplete="false"
        />
      </Tooltip>
      <Button
        style={{
          margin: '0 2px',
          padding: '0',
          height: '24px',
          minWidth: '24px',
        }}
        type="button"
        color="inherit"
        variant="outlined"
        onClick={handleOpen}
      >
        <SearchIcon />
      </Button>
      <TextField
        {...nameField}
        {...props}
        onChange={handleTextFieldChange}
        //style={{ height: '100%', flex: '3 1 auto' }}
        sx={{
          flex: 2,
          height: '1.5rem',
          '& .MuiInputBase-root': {
            height: '1.5rem',
            fontSize: '0.875rem',
          },
          '& .MuiOutlinedInput-input': {
            height: '1.5rem',
            padding: '0 14px',
          },
        }}
        error={error ? true : false}
        autoComplete="false"
      />
    </div>
  );
};

ComSearchPopup.propTypes = {
  control: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  popupId: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default memo(ComSearchPopup);
