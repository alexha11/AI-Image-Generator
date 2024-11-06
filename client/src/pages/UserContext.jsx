import React, { createContext, useState, useEffect } from 'react';
import { postService, searchService, dalleService, userService } from '../services';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('loggedAIAppUser');
    console.log('savedUser', savedUser);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    window.localStorage.setItem('loggedAIAppUser', JSON.stringify(user));
  }
  , [user]);
  
  const setTokenPost = (token) => {
    postService.setToken(token);
  };

  const setTokenSearch = (token) => {
    searchService.setToken(token);
  };

  const setTokenDalle = (token) => {
    dalleService.setToken(token);
  };

  return (
    <UserContext.Provider value={{ user, setUser, setTokenDalle, setTokenPost, setTokenSearch }}>
      {children}
    </UserContext.Provider>
  );
};
