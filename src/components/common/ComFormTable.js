import ComCommonButtons from './ComCommonButtons';

const ComFormTable = ({
  children,
  direction = 'v',
  disabled,
  onSubmit,
  commonButtons,
}) => {
  return (
    <form
      className={direction === 'v' ? 'verticalWrapper' : 'horizontalWrapper'}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      <ComCommonButtons {...commonButtons} />
      {children}
    </form>
  );
};

export default ComFormTable;
