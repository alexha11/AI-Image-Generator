import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt, isImage } from '../utils';
import { FormField, Loader } from '../components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chevronupicon, reload } from '../assets';
import { options, headerOptions } from '../constants/cons';
import { SearchText, GenerateText } from '../constants/cons';

import { postService } from '../services';
import { userService } from '../services';
import { dalleService } from '../services';
import { searchService } from '../services';
import { UserContext } from './UserContext';
 
const CreatePost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingText, setGeneratingText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(-1);
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ImageGPT ' + options[0].label);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [imagesData, setImagesData] = useState([]);
  
  const handleOptionClick = (option) => {
    setSelectedOption('ImageGPT ' + option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedAIAppUser');

        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          setForm({ ...form, name: user.username });
          const data = await userService.getById(user.id);
          setCount(data.data.count);
        }
       
      }
      catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
  }, []);


  const succesNoti = (text) => {
    toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      progress: undefined,
    });
    return;
  }

  const errorNoti = () => {
    toast.error('Please enter correct passworld!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      progress: undefined,
    });
    return;
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        if(count >= 5) {
          alert('You have reached the limit of 5 images');
          return;
        }
        setGeneratingText(true);
        if (selectedOption === 'ImageGPT Dall-e-2') {
          const data = await dalleService.generate(form.prompt);
          setForm({ ...form, photo:  'data:image/jpeg;base64,' + data.photo });
        }
        else {
          const data = await searchService.search(form.prompt);

          console.log('checking data', data.response.images);
          setImagesData(data.response.images);

          console.log(imagesData);
          const randomIndex = Math.floor(Math.random() * imagesData.length)
          
          // const src = imagesData[randomIndex].source?.page; 
          const img = imagesData[randomIndex].image?.url;
          const thumbnail = imagesData[randomIndex].thumbnail?.url;

          
          // console.log(src);
          console.log(img);
          console.log(thumbnail);

          const url = isImage(img) ? img : thumbnail;

          setForm({ ...form, photo: url });
        }
        setGeneratingText(false);
        setCount(count + 1);
        console.log(user.id);
        await userService.updateCount(user.id, count + 1);

        succesNoti('Image generated successfully');
      } catch (error) {
        console.log(error);
    }
    finally {
      setGeneratingText(false);
    }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      try {
        setLoading(true);
        const data = await postService.create(form);
        console.log(data);
        navigate('/');
        succesNoti('Image shared successfully');

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleGenerateText =  () => {
    const randomPrompt =  selectedOption === 'ImageGPT Dall-e-2' ? getRandomPrompt(form.prompt, GenerateText) : getRandomPrompt(form.prompt, SearchText);
    setForm({ ...form, prompt: randomPrompt });
  }

  const checkPassword = async() => {
    if(password === import.meta.env.VITE_PASSWORD) {
      succesNoti('Usage limit resets successfully');
      setCount(0);
      await userService.updateCount(user.id, 0);
      setReset(false);
      setPassword('');
    } else {
      errorNoti();
    }
  }

  const handleRandomImage = () => {
    if (imagesData.length === 0) {
      alert('Please generate an image first');
      return;
    }
    const randomIndex = Math.floor(Math.random() * imagesData.length)
    
    const src = imagesData[randomIndex].source.page; 
    const img = imagesData[randomIndex].image.url;
    const thumbnail = imagesData[randomIndex].thumbnail.url;
          

    console.log(src);
    console.log(img);
    console.log(thumbnail);

    const url = isImage(img) ? img : thumbnail;

    setForm({ ...form, photo: url });
  }

  return (
    <section className="max-w-7xl mx-auto ">
      
      <div className='flex justify-between'>
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">{selectedOption === 'ImageGPT Dall-e-2' ? headerOptions[0].header : headerOptions[1].header} </h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">{selectedOption === 'ImageGPT Dall-e-2' ? headerOptions[0].subheader : headerOptions[1].subheader}</p>
        </div>
        <div className="relative w-64 mt-4">
          <label className="absolute top-[-11px] left-1 px-1 text-[10px] text-gray-500">
            Select Engine
          </label>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-3 text-[#666e75] text-[14px] bg-[#f9fafe] rounded-lg shadow-md focus:outline-none"
          >
            <span>{selectedOption}</span>
            {
              isOpen ? (
                <img src={chevronupicon} className='w-5 h-5 rotate-180 transition-transform'/>
              ) : (
                <img src={chevronupicon} className='w-5 h-5'/>
              )
            }
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 z-10 w-full mt-2 bg-gray-50 rounded-lg shadow-md">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleOptionClick(option)}
                  className={`flex flex-col items-start w-full px-4 py-3 text-left text-gray-800 ${option.working ? 'hover:bg-gray-100' : 'pointer-events-none bg-gray-50'} focus:outline-none`}
                >
                  <span className="font-semibold text-[14px] ">{option.label}</span>
                  <span className="text-[13px] text-gray-500">{option.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div> 
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
              LabelName='Your name (optional)'
              type='text'
              name='name'
              placeholder='Ex., Duong'
              value={form.name}
              handleChange={handleChange}
              />

          <FormField
            LabelName='Prompt'
            type='text'
            name='prompt'
            placeholder='Enter your prompt'
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe={true}
            handleGenerating={handleGenerateText}
          />
        <div className='flex flex-row'>
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
              ) : (
                <img src={preview} alt='preview' className="w-9/12 h-9/12 object-contain opacity-40" />
                )}
              {generatingText && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg '>
                  <Loader/>
                </div>
              )}
            </div>
            {
              selectedOption === 'ImageGPT Api-1' && (
                <button className='flex ml-3 items-end' type='button'>
                  <img src={reload} className='w-6 h-6 cursor-pointer' onClick={handleRandomImage}/>
                </button>
              )
            }
          </div>
        </div>
        <div className='mt-5 flex items-center gap-5'> 
            <button
              className="linear flex flex-row items-center rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
              data-ripple-light
              onClick={generateImage}
              type='button'
            >
              <svg
                className="mr-2 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="16"
                width="16"
              >
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 .34-.03.67-.08 1h2.02c.05-.33.06-.66.06-1 0-4.42-3.58-8-8-8zm-6 6c0-.34.03-.67.08-1H3.98c-.05.33-.06.66-.06 1 0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z" />
              </svg>

              {generatingText ? 'Generating...' : 'Generate'}
            </button>
            <p className='text-[#222629] text-[14px] inline'>Limit per reset: {count !== -1 ? <div>{count} / 5</div> : <p>Loading...</p>}</p>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it to the community</p>
          <button
            type='submit'
            className='text-white bg-[#4681f4] hover:bg-[#5783db] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5'>
              <svg
                className="mr-2 fill-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="16"
                width="16"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.012 3.012 0 0 0 0-1.4l7.05-4.11a2.99 2.99 0 1 0-1.05-1.81l-7.05 4.11a3.012 3.012 0 1 0 0 4.8l7.05 4.11c.5-.46 1.19-.77 1.95-.77a3 3 0 1 0 0-6z" />
              </svg>

              {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
        
        
      </form>
      
      <div className='mt-36'>
            <div className='bg-black w-full h-[0.5px]'></div>
            <h2 className='text-[#222328] text-[25px] font-semibold'>Usage Limit</h2>
            <p className='text-[#666e75] text-[12px] inline'>Note: Users can generate images up to 5 times. Only an admin with the password can reset this limit. If you want to reset the usage limit, click here: </p>
            <button className='text-[#666e75] text-[14px] ml-3' onClick={() => {setReset(!reset)}}>Reset</button>
            <ToastContainer />
        </div>
        {
          reset && (
            <div className='mt-2'>
              <FormField
                LabelName='Password'
                type='password'
                name='password'
                placeholder='Enter password'
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                className='text-white bg-[#5adbb5] hover:bg-[#5dbea3] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5'
                onClick={checkPassword}
                >
                  Reset
              </button>
            </div>
          )
        }
       
    </section>
  );
} 

export default CreatePost;