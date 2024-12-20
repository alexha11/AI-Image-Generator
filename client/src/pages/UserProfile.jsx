import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { postService, userService } from '../services';
import { heart } from '../assets';

const UserProfile = () => {
  const { user, setTokenPost} = useContext(UserContext);

  const [loveReceived, setLoveReceived] = useState(0);
  const [createdPostSortedByLove, setCreatedPostSortedByLove] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [lovePostCount, setLovePostCount] = useState(0);

  const [lovedPost, setLovedPost] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setTokenPost(user.token);
  
        const createdPost = user.createdPosts;
        const lovedPost = user.lovedPosts;
  
        setLoveReceived(createdPost.reduce((acc, post) => acc + post.love, 0));
        setCreatedPostSortedByLove([...createdPost].sort((a, b) => b.love - a.love)); // Copy to avoid mutating state
        setPostCount(createdPost.length);
        setLovePostCount(lovedPost.length);
        setLovedPost(lovedPost);
  
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user) fetchPosts(); // Only call fetch if user exists
  }, [user, setTokenPost]);  // Add user as a dependency
  
  if (loading || !user) {  // Wait for user to load and loading to finish
    return <div>Loading the information of user ...</div>;
  }

  return (
    <div>
      <h1 className='font-extrabold text-[#222328] text-[32px]'>User Profile</h1>
      <div className='flex flex-col gap-2'>
        <div className='m-auto w-full border-2 border-stone-950 p-4 rounded-md mb-2'>
          <p className='h6'>Hello {user.username}</p>
          <p className='body-2'>Email: {user.email}</p>
          <p className='body-2'>Posts loved: {lovePostCount}</p>
          <p className='body-2'>Love received: {loveReceived}</p>
          <p className='body-2'>Post count: {postCount}</p>
        </div>
      </div>
      <div className='m-auto w-full border-2 border-stone-950 p-4 rounded-md mb-2'>
        <p className='h6'>Posts you loved</p>
        {lovedPost && lovedPost.map(post =>
          <div key={post._id} className='flex flex-col mb-2'>
            <a href={post.photo}>
              <li>
                <span className='body-2'>{post.prompt + ' '}</span>
                <span className='text-red-500'>{post.love} <img src={heart} className='w-6 h-6 inline-block'></img> </span>
              </li>
            </a>
          </div>
        )}
    
      </div>
      <div className='m-auto w-full border-2 border-stone-950 p-4 rounded-md'>
        <p className='h6'>Posts you created ans shared</p>
        {createdPostSortedByLove && createdPostSortedByLove.map(post =>
          <div key={post._id} className='flex flex-col mb-2'>
            <a href={post.photo}>
              <li>
                <span className='body-2'>{post.prompt + ' '}</span>
                <span className='text-red-500'>{post.love} <img src={heart} className='w-6 h-6 inline-block'></img> </span>
              </li>
            </a>
          </div> 
        )}
      </div>
    </div>
  );
}

export default UserProfile;
