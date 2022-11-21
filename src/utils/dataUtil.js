export const dataValidate = (data) => {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null) {
      data[key] = '';
    }
    if (data[key] === false) {
      data[key] = '0';
    }
    if (data[key] === true) {
      data[key] = '1';
    }
  }

  return data;
};

/* 서버로부터 반환된 JSON 키를 대문자로 변경 */
const returnUpperCaseObj = ([key, value]) => {
  if (key === 'id') {
    return [key, value];
  }
  return [key.toUpperCase(), value];
};

export const jsonKeyUpperCase = (obj) => {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      obj[index] = Object.fromEntries(
        Object.entries(item).map(([key, value]) =>
          returnUpperCaseObj([key, value]),
        ),
      );
    });
    return obj;
  } else {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) =>
        returnUpperCaseObj([key, value]),
      ),
    );
  }
};
