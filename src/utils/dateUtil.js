const leftPad = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

const toStringByFormatting = (source, delimiter = '-') => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const date = leftPad(source.getDate());

  return [year, month, date].join(delimiter);
};

export const getToday = () => {
  return toStringByFormatting(new Date());
};

export const getFirstDateOfMonth = () => {
  let today = new Date();
  return toStringByFormatting(new Date(today.getFullYear(), today.getMonth(), 1));
};

export const getLastDateOfMonth = () => {
  let today = new Date();
  return toStringByFormatting(new Date(today.getFullYear(), today.getMonth(), 0));
};