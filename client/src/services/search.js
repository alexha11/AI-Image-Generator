import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ai-image-generator-f5m8.onrender.com/api/v1/search'
  : 'http://localhost:8080/api/v1/search';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const search = async (prompt) => {
  const response = await axios.post(baseUrl, { prompt });
  return response.data;
}

export default { getAll, search };