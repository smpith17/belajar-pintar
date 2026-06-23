import axios from 'axios';

const Api = axios.create({
  // Mengarah ke database online db.json di GitHub kamu
  baseURL: 'https://my-json-server.typicode.com/smpith17/belajar-pintar', 
});

export default Api;