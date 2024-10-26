import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ai-image-generator-f5m8.onrender.com/api/v1/post'
  : 'http://localhost:8080/api/v1/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log('token set to', token);
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

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
} 

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

const toggleLove = async (postId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${postId}/love`, {}, config);
  return response;
};

export default { setToken, getAll, create, update, remove, toggleLove };
