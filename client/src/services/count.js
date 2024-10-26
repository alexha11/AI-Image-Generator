import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ai-image-generator-f5m8.onrender.com/api/v1/count'
  : 'http://localhost:8080/api/v1/count';


const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

const patch = async (newObject) => {
  const response = await axios.patch(baseUrl, newObject);
  return response.data;
}

export default { getAll, create, patch };