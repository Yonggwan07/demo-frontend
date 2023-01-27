import client from './client';

export const signin = ({ userId, password }) =>
  client.post('/api/auth/signin', { userId, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const getMenuList = () => client.get('/api/auth/getMenuList');
