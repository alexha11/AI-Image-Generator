import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/user';

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
}

const register = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
}

export default { login, register };
