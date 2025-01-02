import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { getBlogById } from "../services/blogService";

export function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white text-blue-600 py-6">
        <div className="container mx-auto px-4">
          <Link
            to="/blogs"
            className="inline-flex items-center text-black  hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Blogs
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{blog.publishedAt}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                {blog.description}
              </p>
              <div className="space-y-4">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}