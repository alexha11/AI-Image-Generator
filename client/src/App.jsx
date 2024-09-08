import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets'
import { Home, CreatePost, UserProfile } from './pages'
import Login from './pages/Login'
 

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>
        <Link 
          to="/profile" 
          className="border-2 border-slate-950 button text-slate-900 px-4 py-3 rounded-md hover:bg-slate-900 hover:text-white">
          User Profile 
        </Link>
        <Link 
          to="/login" 
          className="border-2 border-slate-950 button text-slate-900 px-4 py-3 rounded-md hover:bg-slate-900 hover:text-white">
          Login/Register
        </Link>
        <Link 
          to="/create-post" 
          className="border-2 border-slate-950 button text-slate-900 px-4 py-3 rounded-md hover:bg-slate-900 hover:text-white">
          Create Post
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/login' element={<Login/>} />
        </Routes> 
      </main>
    </BrowserRouter>
  );
}

export default App;