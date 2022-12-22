import { useState, useCallback, useEffect, memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

let handleDialogFn;

const ComDialog = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState('');
  const [confirmFn, setConfirmFn] = useState(null);

  const handleDialog = useCallback((type, message, confirmFn) => {
    setType(type);
    setMessage(message);
    setConfirmFn(confirmFn);
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    confirmFn();
    setOpen(false);
  }, [confirmFn]);

  useEffect(() => {
    handleDialogFn = handleDialog;
  }, [handleDialog]);

  const handleClose = useCallback(() => setOpen(false), []);
  
  return (
    <Dialog open={open}>
      <DialogTitle>
        <DeleteIcon /> 삭제
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          취소
        </Button>
        <Button onClick={handleConfirm} color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const handleDialogExported = (type, message, confirmFn) => {
  handleDialogFn(type, message, confirmFn);
};

export default memo(ComDialog);
