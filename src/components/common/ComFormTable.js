import React from 'react';
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
  const seq = useWatch({ control, name: 'seq' });

  const getDisabled = (seq, disabled) => {
    if (!seq) {
      return true;
    } else {
      return disabled ? disabled : false;
    }
  };

  return (
    <form
      className={direction === 'v' ? 'wrapperVertical' : 'wrapperHorizontal'}
      onSubmit={onSubmit}
      disabled={getDisabled(seq, disabled)}
      noValidate
    >
      <ComCommonButtons isDirty={isDirty} {...commonButtons} />
      {children}
    </form>
  );
};

export default ComFormTable;
