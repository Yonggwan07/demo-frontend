import QueryString from 'qs';
import { useEffect, useState } from 'react';
import { getApi } from '../lib/api/transaction';

const useCombo = (codeOptions) => {
  const [comCombo, setComCombo] = useState({});

  const getNewCombo = (code, postFn) => {
    if (comCombo[code]) {
      return;
    }

    getApi({
      menuId: 'combo',
      params: [code],
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
    getApi('combo', {
      params: { codes: codeOptions },
      paramsSerializer: (params) => {
        return QueryString.stringify(params, { indices: false });
      },
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
