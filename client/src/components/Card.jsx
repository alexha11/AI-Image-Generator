import React from 'react';

import { download, heart } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo, love, onLoveUpdate }) => {
  const handleLoveButton = async () => {
    console.log('love button clicked' + _id); 
    const newPost = {
      _id: _id,
      name: name,
      prompt: prompt,
      photo: photo,
      love: love + 1,
    }
    try {
      const response = await fetch(`https://ai-image-generator-f5m8.onrender.com/api/v1/post/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost), 
      });
      const data = await response.json();
      if (data.success) {
        onLoveUpdate(newPost);
        console.log(data.data);
      }
    } catch (error) {
      console.error('Error updating love:', error);
    }
  };
  
  //console.log(_id);
  return (
    <div className="rounded-xl group relative boxShadow-card hover:boxShadow-cardhover ">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
  
        <div className="flex justify-start items-center mb-2">
          <button className='text-white text-sm mr-3'  onClick={handleLoveButton}>
            <img src={heart} alt="heart" className="w-6 h-6 object-contain" />
          </button>
          <p className="text-white text-sm">{love ? love : 0}</p>
        </div>
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
  
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;