import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { setToken, getAll, create, update, remove };
