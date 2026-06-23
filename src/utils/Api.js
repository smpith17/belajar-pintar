import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://6a3a52cf917c7b14c74d4b5c.mockapi.io/', // URL JSON Server
});

export default Api;