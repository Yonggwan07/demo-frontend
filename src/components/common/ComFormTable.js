import React from 'react';
import ComCommonButtons from './ComCommonButtons';
import { useFormState, useWatch } from 'react-hook-form';
import { PropTypes } from 'prop-types';

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

ComFormTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  direction: PropTypes.oneOf(['v', 'h']),
  disabled: PropTypes.bool,
  control: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  commonButtons: PropTypes.shape({
    search: PropTypes.object,
    cancel: PropTypes.object,
    insert: PropTypes.object,
    save: PropTypes.object,
    remove: PropTypes.object,
    isDirty: PropTypes.bool,
  }),
};

export default ComFormTable;
