import client from './client';

export const postApi = ({ menuId, workId, params }) =>
  client
    .post(`/api/${menuId}/${workId}`, params)
    .catch(({ response }) => response);

export const getApi = ({ menuId, workId, params }) =>
  client
    .get(`/api/${menuId}/${workId}`, { params })
    .catch(({ response }) => response);
