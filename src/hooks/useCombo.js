import { useEffect, useState } from 'react';
import { transaction } from '../lib/api/transaction';

const useCombo = (codeOptions) => {
  const [comCombo, setComCombo] = useState({});

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

  return { comCombo };
};

export default useCombo;
