import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, CreatePost } from './pages';
import { logo } from './assets'
 

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={logo} alt="logo" className='w-28 object-contain'/>
          <p>test</p>
        </Link>
        <Link to="/create">Create Post</Link>
      </header>
    </BrowserRouter>
  );
}

export default App;