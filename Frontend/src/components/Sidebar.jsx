import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [popularBlog, setPopularBlog] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setPopularBlog(data.slice(0, 15)));
  }, []);

  return (
    <div>
      <div>
        <h3 className='text-2xl font-semibold px-4'>Latest Blogs</h3>
        <div>
          {popularBlog.slice(0, 5).map(blog => (
            <div className='my-5 border-b-2 border-spacing-2 px-4' key={blog.id}>
              <h4 className='font-medium mb-2'>{blog.title}</h4>
              <Link to={`/blogs/${blog.id}`} className='inline-flex items-center pb-2 text-base hover:text-orange-500'>
                Read now <FaArrowRight className='mt-1 ml-2'/>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-2xl font-semibold mt-20 px-4'>Popular Now</h3>
        <div>
          {popularBlog.slice(6, 10).map(blog => (
            <div className='my-5 border-b-2 border-spacing-2 px-4' key={blog.id}>
              <h4 className='font-medium mb-2'>{blog.title}</h4>
              <Link to={`/blogs/${blog.id}`} className='inline-flex items-center pb-2 text-base hover:text-orange-500'>
                Read now <FaArrowRight className='mt-1 ml-2'/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
