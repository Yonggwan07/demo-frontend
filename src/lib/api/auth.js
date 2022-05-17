import client from './client';

export const signin = ({ id, pw, scnbYsno }) =>
  client.post('/api/auth/signin', { id, pw, scnbYsno });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
