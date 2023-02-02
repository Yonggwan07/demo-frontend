import client from './client';

export const getApi = (menuId, params, workId) => {
  return client
    .get(buildUrl(menuId, workId), params)
    .catch(({ response }) => response);
};

export const postApi = (menuId, params, workId) =>
  client
    .post(buildUrl(menuId, workId), params)
    .catch(({ response }) => response);

export const putApi = (menuId, params, workId) =>
  client
    .put(buildUrl(menuId, workId), params)
    .catch(({ response }) => response);

export const deleteApi = (menuId, params, workId) =>
  client
    .delete(buildUrl(menuId, workId), params)
    .catch(({ response }) => response);

const buildUrl = (menuId, workId) => {
  return `/api/${menuId}` + (workId ? `/${workId}` : '');
};
