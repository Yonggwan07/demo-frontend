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
  const id = useWatch({ control, name: 'id' });

  const getDisabled = (id, disabled) => {
    if (!id) {
      return true;
    } else {
      return disabled ? disabled : false;
    }
  };

  return (
    <form
      className={direction === 'v' ? 'wrapperVertical' : 'wrapperHorizontal'}
      onSubmit={onSubmit}
      disabled={getDisabled(id, disabled)}
      noValidate
    >
      <ComCommonButtons isDirty={isDirty} {...commonButtons} />
      {children}
    </form>
  );
};

export default ComFormTable;
