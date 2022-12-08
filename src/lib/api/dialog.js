import { handleDialogExported } from '../../components/common/ComDialog';

export default function handleDialog(type, message, confirmFn) {
  handleDialogExported(type, message, confirmFn);
}
