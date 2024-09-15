import React, { useState, useContext, useRef, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';

import { Home, CreatePost, UserProfile } from './pages';
import Login from './pages/Login';
import { UserContext } from './pages/UserContext'; 

const App = () => {
  const { user, setUser } = useContext(UserContext); // Access setUser from UserContext
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown menu
  const buttonRef = useRef(null); // Reference for the dropdown button

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const name = user ? user.username : '';
  const firstLetter = user ? name.charAt(0).toUpperCase() : '';

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/home">
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>
        <div className="relative w-60 flex justify-end">
          <button
            onClick={toggleDropdown}
            ref={buttonRef} 
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {firstLetter}
              </div>
              <p className="text-sm">{name}</p>
            </div>
          </button>

          {isOpen && (
            <nav
              className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50"
              ref={dropdownRef}
            >
              <ul className="flex flex-col gap-5 p-4">
                <li>
                  <Link
                    to="/home"
                    onClick={toggleDropdown}
                    className="text-[#222629] text-sm hover:bg-gray-200 p-2 rounded-md block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-post"
                    onClick={toggleDropdown}
                    className="text-[#222629] text-sm hover:bg-gray-200 p-2 rounded-md block"
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={toggleDropdown}
                    className="text-[#222629] text-sm hover:bg-gray-200 p-2 rounded-md block"
                  >
                    Profile
                  </Link>
                </li>
                {user ? (
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        setUser(null);
                        toggleDropdown();
                      }}
                      className="text-[#222629] text-sm hover:bg-gray-200 p-2 rounded-md block"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/"
                      onClick={toggleDropdown}
                      className="text-[#222629] text-sm hover:bg-gray-200 p-2 rounded-md block"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
