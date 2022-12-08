import ComCommonButtons from './ComCommonButtons';

const ComFormTable = ({
  children,
  direction = 'v',
  disabled,
  isDirty,
  onSubmit,
  commonButtons,
}) => {
  return (
    <form
      className={direction === 'v' ? 'verticalWrapper' : 'horizontalWrapper'}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      <ComCommonButtons isDirty={isDirty} {...commonButtons} />
      {children}
    </form>
  );
};

export default ComFormTable;
