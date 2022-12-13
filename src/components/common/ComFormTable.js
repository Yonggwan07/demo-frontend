import ComCommonButtons from './ComCommonButtons';
import { useFormState, useWatch } from 'react-hook-form';

const ComFormTable = ({
  children,
  direction = 'v',
  disabled,
  control,
  onSubmit,
  commonButtons,
}) => {
  const { isDirty } = useFormState({ control });
  const id = useWatch({ control, name: 'id' });

  return (
    <form
      className={direction === 'v' ? 'verticalWrapper' : 'horizontalWrapper'}
      onSubmit={onSubmit}
      disabled={!id ? true : disabled ? disabled : false}
      noValidate
    >
      <ComCommonButtons isDirty={isDirty} {...commonButtons} />
      {children}
    </form>
  );
};

export default ComFormTable;
