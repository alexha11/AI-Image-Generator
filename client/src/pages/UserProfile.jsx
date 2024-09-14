import { useState, useContext } from 'react';
import { postService } from '../services';
import { UserContext } from './UserContext';

const UserProfile = () => {
  const { user } = useContext(UserContext);


  return (
    <div>
      <h1>User Profile:</h1>
      
      <p>Hello {user ? user.username : ''} </p>
    </div>
  );
}

export default UserProfile; 