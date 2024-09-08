import { React, useState } from 'react';
import { FormField } from '../components';

const Login = () => {
  const [isShowRegister, setIsShowRegister] = useState(false);

  return (
    <div className="container relative">
      {isShowRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}
      
      <div className={`flex flex-col items-center justify-center z-0 ${isShowRegister ? 'pointer-events-none' : ''}`}>
        <h1 className="h4 mb-10">Login</h1>
        <div className='bg-white min-w-[27rem] p-10 rounded-md border-collapse border-2'>
          <form className="flex flex-col gap-5">
            <FormField LabelName='Email' />
            <FormField LabelName='Password' />
            <button className='text-white bg-[#4681f4] hover:bg-[#5783db] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3'>
              Login
            </button>
          </form>
          <p className="flex justify-end text-[14px] text-gray-500 gap-1 tracking-tighter mt-1">
              Don't have an account?
              <button onClick={() => { setIsShowRegister(true) }} className='text-blue-500'>Register</button>
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
            <button
              onClick={() => { setIsShowRegister(false) }}
              className="button-4 button">
              <span className={`burger burger-4 is-closed`}></span>
            </button>
          </div>
            <form className="flex flex-col gap-5">
              <FormField LabelName='Username' />
              <FormField LabelName='Email' />
              <FormField LabelName='Password' />
              <FormField LabelName='Confirm Password' />
              <button className='text-white bg-[#4681f4] hover:bg-[#5783db] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5'>
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
