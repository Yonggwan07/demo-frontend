import client from './client';

export const transaction = ({ menuId, workId, params }) =>
  client
    .post(`/api/${menuId}/${workId}`, params)
    .catch(({ response }) => response);