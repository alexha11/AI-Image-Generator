import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config);
  return response.data;
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const update = async (_id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${_id}`, newObject, config);
  return response.data;
} 

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { setToken, getAll, create, update, remove };
