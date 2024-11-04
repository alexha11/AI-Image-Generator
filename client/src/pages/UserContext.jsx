import React, { createContext, useState, useEffect } from 'react';
import { postService } from '../services';
import { searchService, dalleService } from '../services';
import { userService } from '../services';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedAIAppUser');

      if (loggedUserJSON) {
        const userData = JSON.parse(loggedUserJSON);
        
        postService.setToken(userData.token);
        searchService.setToken(userData.token);
        dalleService.setToken(userData.token);

        const userById = await userService.getById(userData.id);
        setUser({ ...userData, lovedPosts: userById.data.lovedPosts });
      }
    }

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
