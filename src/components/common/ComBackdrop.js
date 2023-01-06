import React, { useCallback, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let handleBackdropFn;

const ComBackdrop = () => {
  const [open, setOpen] = useState(false);

  const handleBackdrop = useCallback((isOpen) => {
    setOpen(isOpen);
  }, []);

  useEffect(() => {
    handleBackdropFn = handleBackdrop;
  }, [handleBackdrop]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const handleBackdropExported = (isOpen) => {
  handleBackdropFn(isOpen);
};

export default ComBackdrop;
