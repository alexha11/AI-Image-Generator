import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../pages/UserContext';

import { download, heart, unheart } from '../assets';
import { downloadImage } from '../utils';

import { postService } from '../services';

const Card = ({ _id, name, prompt, photo, love, onLoveUpdate }) => {
  const { user, setUser } = useContext(UserContext);
  
  const [isLovedByUser, setIsLovedByUser] = useState(
    user && user.lovedPosts.some((post) => post === _id)
  );
  const [loveCount, setLoveCount] = useState(love);

  const handleLoveButton = async () => {
    if (!user) {
      alert('Please login to love a post');
      return;
    }
    console.log(user);
    try {
      const response = await postService.toggleLove(_id);
      const updatedPost = response.data.post;
      const loved = response.data.isLovedByUser;

      setIsLovedByUser(loved);
      setLoveCount(updatedPost.love);

      onLoveUpdate(updatedPost);
      
      let updatedLovedPostsID; 
      if (loved) {
        updatedLovedPostsID = user.lovedPosts.concat(_id);
      } else {
        updatedLovedPostsID = user.lovedPosts.filter((post) => post !== _id);
      }
      setUser({ ...user, lovedPosts: updatedLovedPostsID });
    } catch (error) {
      alert('Failed to love the post');
    }
  };

  return (
    <div className="rounded-xl group relative boxShadow-card hover:boxShadow-cardhover ">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <div className="flex justify-start items-center mb-2">
          <button className='text-white text-sm mr-3' onClick={handleLoveButton}>
            <img
              src={isLovedByUser ? heart : unheart}
              alt="heart"
              className="w-6 h-6 object-contain"
            />
          </button>
          <p className="text-white text-sm">{loveCount ? loveCount : 0}</p>
        </div>
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-600 flex justify-center items-center text-white text-xs font-bold">
              {name[0].toUpperCase()}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
