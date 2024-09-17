import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { postService } from '../services';
import { heart } from '../assets';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [loveReceived, setLoveReceived] = useState(0);
  const [createdPostSortedByLove, setCreatedPostSortedByLove] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedAIAppUser');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          postService.setToken(user.token);
          console.log(user);
          const data = await postService.getAll();
          
          const createdPost = data.data.filter(post => post.user?._id === user.id);
          
          setLoveReceived(createdPost.reduce((acc, post) => acc + (post.love || 0), 0));
  
          setCreatedPostSortedByLove(createdPost.sort((a, b) => (b.love || 0) - (a.love || 0)));
  
          setPostCount(createdPost.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  

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
          <p className='body-2'>Love received: {loveReceived}</p>
          <p className='body-2'>Post count: {postCount}</p>
        </div>
      </div>
      <div className='m-auto w-full border-2 border-stone-950 p-4 rounded-md mb-2'>
        <p className='h6'>Posts you loved</p>
        
    
      </div>
      <div className='m-auto w-full border-2 border-stone-950 p-4 rounded-md'>
        <p className='h6'>Posts you created</p>
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
