import { openSnackbarExported } from '../../components/common/ComSnackbar';

export default function openSnackbar(
  obj,
  severity = 'success',
  useSnackbar = true,
) {
  if (useSnackbar) {
    openSnackbarExported({ message: obj.message || obj.toString(), severity });
  }
}
