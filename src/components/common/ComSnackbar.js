import { useCallback, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

let openSnackbarFn;

const ComSnackbar = () => {
  const [state, setState] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const openSnackbar = useCallback(({ message, severity }) => {
    setState({ open: true, severity, message });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setState({ open: false, severity: 'success', message: '' });
  }, []);

  useEffect(() => {
    openSnackbarFn = openSnackbar;
  }, [openSnackbar]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={state.open}
      autoHideDuration={1500}
      onClose={handleSnackbarClose}
    >
      <Alert
        severity={state.severity}
        sx={{ width: '100%' }}
        elevation={6} // Shadow depth
        variant="filled"
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export const openSnackbarExported = ({ message, severity }) => {
  openSnackbarFn({ message, severity });
};

export default ComSnackbar;
