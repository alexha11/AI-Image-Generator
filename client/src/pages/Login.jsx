import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postService, userService } from '../services';
import { UserContext } from './UserContext'; 

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const successNoti = (text) => {
    toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const errorNoti = (text) => {
    toast.error(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleChangeRegister = (e) => {
    e.preventDefault();
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else {
      setPasswordConfirm(e.target.value);
    }
  };

  const handleChangeLogin = (e) => {
    e.preventDefault();
    if (e.target.name === 'email') {
      setEmailLogin(e.target.value);
    } else {
      setPasswordLogin(e.target.value);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== passwordConfirm) {
      alert('Password and confirm password do not match');
      return;
    }
    const newUser = { username, email, password };
    console.log(newUser);
    try {
      const data = await userService.register(newUser);
      successNoti('User registered successfully');
      console.log(data);
    } catch (error) {
      console.error('Error registering user:', error.response.data.message);
      errorNoti(error.response.data.message);
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setIsShowRegister(false);
    setShowPassword(false);
    setLoading(false);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email: emailLogin, password: passwordLogin };
    try {
      const data = await userService.login(user);
      window.localStorage.setItem('loggedAIAppUser', JSON.stringify(data));

      setUser(data); // Set the logged-in user to context
      console.log(data.token);
      postService.setToken(data.token);
      navigate('/');
      successNoti('Logged in successfully');
      console.log(data);
    } catch (error) {
      console.error('Error logging in:', error);
      errorNoti('Wrong credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container relative">
      <ToastContainer />
      {isShowRegister && <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>}

      <div className={`flex flex-col items-center justify-center z-0 ${isShowRegister ? 'pointer-events-none' : ''}`}>
        <h1 className="h4 mb-10">Login</h1>
        <div className='bg-white min-w-[27rem] p-10 rounded-md border-collapse border-2'>
          <form className="flex flex-col gap-5" onSubmit={handleSubmitLogin}>
            <FormField LabelName='Email' name='email' value={emailLogin} handleChange={handleChangeLogin} />
            <div>
              <FormField LabelName='Password' type={`${showPasswordLogin ? 'text' : 'password'}`} name='password' value={passwordLogin} handleChange={handleChangeLogin} />
              <input type='checkbox' id='showPassword' name='showPassword' value={showPasswordLogin} onChange={() => { setShowPasswordLogin(!showPasswordLogin) }} className='mt-3' />
              <label htmlFor='showPassword' className='text-[14px] text-gray-500 ml-2'>Show password</label>
            </div>
            <button disabled={loading} className='text-white bg-[#4681f4] hover:bg-[#5783db] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3'>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <p className="flex justify-end text-[14px] text-gray-500 gap-1 tracking-tighter mt-1">
            Don't have an account?
            <button onClick={() => { setIsShowRegister(true); setShowPassword(false);}} className='text-blue-500'>Register</button>
          </p>
        </div>
      </div>

      {isShowRegister && (
        <div className='absolute inset-0 flex items-center justify-center z-20'>
          <div className='bg-white min-w-[32rem] px-8 py-8 rounded-md border-collapse border-2 relative'>
            <div className='flex justify-between'>
              <div className='mb-5'>
                <h1 className="h4">Register</h1>
                <p className="text-[14px] text-gray-500 max-w-[20rem]">Create an account to start sharing your images with the community</p>
              </div>
              <button onClick={() => { setIsShowRegister(false) }} className="button-4 button">
                <span className={`burger burger-4 is-closed`}></span>
              </button>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmitRegister}>
              <FormField LabelName='Username' name='username' value={username} handleChange={handleChangeRegister} />
              <FormField LabelName='Email' name='email' value={email} handleChange={handleChangeRegister} />
              <FormField LabelName='Password' name='password' type={`${showPassword ? 'text' : 'password'}`} value={password} handleChange={handleChangeRegister} />
              <div>
                <FormField LabelName='Confirm Password' type={`${showPassword ? 'text' : 'password'}`} name='passwordConfirm' value={passwordConfirm} handleChange={handleChangeRegister} />
                <input type='checkbox' id='showPassword' name='showPassword' value={showPassword} onChange={() => { setShowPassword(!showPassword) }} className='mt-2' />
                <label htmlFor='showPassword' className='text-[14px] text-gray-500 ml-2'>Show password</label>
              </div>
              <button className='text-white bg-[#4681f4] hover:bg-[#5783db] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5'>
                {loading ? 'Loading...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
