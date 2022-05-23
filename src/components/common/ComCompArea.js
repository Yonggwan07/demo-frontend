const v = 'vertical';
const h = 'horizontal';

const setDirection = (direction) => {
  const d = !direction ? 'H' : direction.toUpperCase();
  switch (d) {
    case 'VERTICAL':
    case 'V':
      return v;
    case 'HORIZONTAL':
    case 'H':
    default:
      return h;
  }
};

const ComCompArea = ({ direction, children }) => {
  const d = setDirection(direction);
  return (
    <>
      {d === v && <div className="verticalWrapper">{children}</div>}
      {d === h && <div className="horizontalWrapper">{children}</div>}
    </>
  );
};

export default ComCompArea;
