import { useEffect, useState } from 'react';
import { postApi } from '../lib/api/transaction';

const useCombo = (codeOptions) => {
  const [comCombo, setComCombo] = useState({});

  const getNewCombo = (code, postFn) => {
    if (comCombo[code]) {
      return;
    }

    postApi({
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
    postApi({
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
