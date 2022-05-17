import client from './client';

export const search = ({ menuId, workId, params }) =>
  client.post(`/api/${menuId}/${workId}`, params);
