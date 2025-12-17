import axios from 'axios';

const baseURL = 'http://192.168.1.12:5555';

const client = axios.create({
  baseURL,
});

export default client;
