import { openSnackbarExported } from '../../components/common/ComSnackbar';

export default function openSnackbar(obj, severity = 'success') {
  openSnackbarExported({ message: obj.message || obj.toString() , severity});
}