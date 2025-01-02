import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '../components/Cards/BlogCard';
import { RecommendedBlog } from '../components/HelperComponents/RecommendedBlog';
import { getBlogs } from '../services/blogService';

export function BlogListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogs();
        setData(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Skill Exchange Blogs</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={data.featured.image} 
              alt={data.featured.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{data.featured.title}</h2>
              <p className="text-gray-600 mb-4">{data.featured.description}</p>
              <button 
                onClick={() => handleBlogClick(data.featured.id)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Read More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended Blogs</h3>
            <div className="space-y-4">
              {data.recommended.map(blog => (
                <RecommendedBlog
                  key={blog.id}
                  title={blog.title}
                  image={blog.image}
                  onClick={() => handleBlogClick(blog.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Blog Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.blogs.map(blog => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                author={blog.author}
                readTime={blog.readTime}
                onClick={() => handleBlogClick(blog.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
