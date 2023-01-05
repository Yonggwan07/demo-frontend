import { useEffect, useState } from 'react';
import { transaction } from '../lib/api/transaction';

const useCombo = (codeOptions) => {
  const [comCombo, setComCombo] = useState({});

  const getNewCombo = (code, postFn) => {
    if (comCombo[code]) {
      return;
    }

    transaction({
      menuId: 'comCombo',
      workId: 'getCombo',
      params: [{ commCode: code, usexYsno: '1' }],
    }).then((res) => {
      if (res.status === 200) {
        const newCode = res.data;
        setComCombo((prev) => Object.assign(prev, newCode));
        postFn(comCombo);
      } else {
        console.error(res);
      }
    });
  };
  useEffect(() => {
    transaction({
      menuId: 'comCombo',
      workId: 'getCombo',
      params: codeOptions,
    }).then((res) => {
      if (res.status === 200) {
        setComCombo(res.data);
      } else {
        console.error(res);
      }
    });
  }, [codeOptions]);

  return { comCombo, getNewCombo };
};

export default useCombo;
