import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/UserContext';

const RequireLogin = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  console.log('user:', user);
  if (user == null) {
    <p className='h1 text-emerald-800'>Please login</p>
  }

  return null;
}

export default RequireLogin;