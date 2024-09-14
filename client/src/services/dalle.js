import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/dalle';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const generate = async (prompt) => {
  const response = await axios.post(baseUrl, { prompt });
  return response.data;
}

export default { getAll, generate };