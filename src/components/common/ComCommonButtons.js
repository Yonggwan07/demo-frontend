import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

const ComCommonButtons = ({
  search,
  cancel,
  insert,
  save,
  remove,
  isDirty,
}) => {
  return (
    <div
      className="commonButtons"
      display="flex"
      style={{ marginLeft: 'auto' }}
    >
      {cancel && (
        <Button
          size="small"
          variant="text"
          color="warning"
          startIcon={<CancelIcon />}
          disabled={!isDirty}
          {...cancel}
        >
          취소
        </Button>
      )}
      {search && (
        <Button
          size="small"
          variant="text"
          color="primary"
          startIcon={<SearchIcon />}
          {...search}
        >
          조회
        </Button>
      )}
      {insert && (
        <Button
          size="small"
          variant="text"
          color="success"
          startIcon={<AddCircleIcon />}
          {...insert}
        >
          신규
        </Button>
      )}
      {save && (
        <Button
          size="small"
          variant="text"
          color="info"
          startIcon={<SaveIcon />}
          disabled={!isDirty}
          {...save}
        >
          저장
        </Button>
      )}
      {remove && (
        <Button
          size="small"
          variant="text"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={isDirty}
          {...remove}
        >
          삭제
        </Button>
      )}
    </div>
  );
};

ComCommonButtons.propTypes = {
  search: PropTypes.object,
  cancel: PropTypes.object,
  insert: PropTypes.object,
  save: PropTypes.object,
  remove: PropTypes.object,
  isDirty: PropTypes.bool,
};

export default ComCommonButtons;
