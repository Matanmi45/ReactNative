import axios from 'axios';

const baseURL = 'http://10.51.207.72:5555';

const client = axios.create({
  baseURL,
});

export default client;
