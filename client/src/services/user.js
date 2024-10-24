import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/user';

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const register = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
}

const update = async (id, user) => {
  const response = await axios.put(`${baseUrl}/${id}`, user);
  return response.data;
}

const updateCount = async (id, count) => {
  const response = await axios.put(`${baseUrl}/${id}`, {count});
  return response.data;
}

export default { login, getById, register, update, updateCount };
