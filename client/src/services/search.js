import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ai-image-generator-f5m8.onrender.com/api/v1/search'
  : 'http://localhost:8080/api/v1/search';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log('token set to', token);
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const search = async (prompt) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { prompt }, config);
  return response.data;
}

export default { setToken, getAll, search };