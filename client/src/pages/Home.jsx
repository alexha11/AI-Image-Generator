import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(false );
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);

  const [searchText, setSearchText] = useState('');

  useEffect( () => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setPosts(data.data.reverse());
        console.log(posts)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if(searchText.length > 0) {
      const filteredPosts = posts.filter(post => post.prompt.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredPosts(filteredPosts);
    }
  }

  const updateLoveCount = (updatedPost) => {
    setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
    if (filteredPosts) {
      setFilteredPosts(filteredPosts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
    }
  };

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) return data.map(post => <Card _id={post._id} name={post.name} prompt={post.prompt} photo={post.photo} love={post.love} onLoveUpdate={updateLoveCount} 
      />)
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">No results found for <span className="text-[#222328]">{title}</span></h2>
    )  
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto ">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
        </div>
        <div className="mt-16">
          <FormField
            LabelName={'Search posts'}
            type='text'
            name='text'
            value={searchText}
            handleChange={handleSearch}
           />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <div>
                  <h2 className="font-medium text-[#666e75] text-xl mb-3"> Search Results for <span className="text-[#222328]">{searchText}</span></h2>
                </div>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (<RenderCards data={filteredPosts} title={searchText} />) : (<RenderCards data={posts} title="All Posts" />)}
              </div>
            </>
          )
        } 
        </div>
      </section>
    </div>

  );
} 

export default Home;