import React, { createContext, useState, useEffect } from 'react';
import { postService } from '../services';
import { searchService, dalleService } from '../services';
import { userService } from '../services';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedAIAppUser');

      if (loggedUserJSON) {
        const userData = JSON.parse(loggedUserJSON);
        const userById = await userService.getById(userData.id);
        
        setUserID(userById)
        setUser({ ...userData, lovedPosts: userID.data.lovedPosts });
      }
    };
    fetchUserData();
  }, []);

  const setTokenPost = () => {
    if (user) {
      postService.setToken(user.token);
    }
  }
  const setTokenSearch = () => {
    if (user) {
      searchService.setToken(user.token);
    }
  }

  const setTokenDalle = () => {
    if (user) {
      dalleService.setToken(user.token);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, setTokenDalle, setTokenPost, setTokenSearch, userID }}>
      {children}
    </UserContext.Provider>
  );
};
