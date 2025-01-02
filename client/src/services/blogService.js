import { SKILL_CATEGORIES } from '../constants/Skill_Categories';
import { fetchDevToArticles, fetchDevToArticleById } from '../services/api';
import { transformDevToArticle } from '../utils/transformDevToArticle';

const FALLBACK_BLOG = {
  id: 1,
  title: "Getting Started with Web Development",
  description: "Learn the fundamentals of web development and start your coding journey.",
  content: "Web development is an exciting field that combines creativity with technical skills...",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  author: "Skill Exchange Team",
  readTime: "5 min read",
  publishedAt: new Date().toLocaleDateString(),
  category: "coding"
};

export async function getBlogs() {
  try {
    const skillPromises = SKILL_CATEGORIES.flatMap(category => 
      category.tags.slice(0, 2).map(tag => fetchDevToArticles(tag))
    );
    
    const allArticles = await Promise.all(skillPromises);
    const blogs = allArticles
      .flat()
      .map(transformDevToArticle)
      .filter((blog, index, self) => 
        blog.title && 
        blog.description && 
        index === self.findIndex((b) => b.id === blog.id)
      );

    if (blogs.length === 0) {
      return {
        blogs: [FALLBACK_BLOG],
        featured: FALLBACK_BLOG,
        recommended: [FALLBACK_BLOG]
      };
    }

    return {
      blogs: blogs.slice(7),
      featured: blogs[0],
      recommended: blogs.slice(1, 7)
    };
  } catch (error) {
    console.error('Error in getBlogs:', error);
    return {
      blogs: [FALLBACK_BLOG],
      featured: FALLBACK_BLOG,
      recommended: [FALLBACK_BLOG]
    };
  }
}

export async function getBlogById(id) {
  try {
    const article = await fetchDevToArticleById(id);
    return transformDevToArticle(article);
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return {
      ...FALLBACK_BLOG,
      title: "Blog Not Found",
      description: "We couldn't find the blog you're looking for. Please try another one.",
      content: "This blog post is currently unavailable. It may have been removed or you might have followed an invalid link."
    };
  }
}
