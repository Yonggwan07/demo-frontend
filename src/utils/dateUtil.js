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
  return toStringByFormatting(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
};

export const getLastDateOfMonth = () => {
  let today = new Date();
  return toStringByFormatting(
    new Date(today.getFullYear(), today.getMonth(), 0),
  );
};

export const propTypesDateValidation = (
  props,
  propName,
  componentName,
  isRequired,
) => {
  if (!isRequired && props[propName] === undefined) {
    return;
  }
  if (!/^(\d{4})(-\d{2})?(-\d{2})?/.test(props[propName])) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed. It' +
        `'` +
        's not valid date format. (ex. yyyy-mm-dd)',
    );
  }
};
