import axios from 'axios';

const client = axios.create({ withCredentials: false });

export default client;
