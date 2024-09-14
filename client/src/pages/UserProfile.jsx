import { useState, useEffect } from 'react';
import { postService } from '../services';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedAIAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        postService.setToken(user.token)
        console.log(user);
      }
    };

    fetchUser();
  }
  , []);

  return (
    <div>
      <h1>User Profile:</h1>
      
      <p>Hello {user ? user.username : ''} </p>
    </div>
  );
}

export default UserProfile; 