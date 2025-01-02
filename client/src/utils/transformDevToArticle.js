export function transformDevToArticle(article) {
    if (!article || typeof article !== 'object') {
      throw new Error('Invalid article data');
    }
  
    return {
      id: article.id || Math.random(),
      title: article.title || 'Untitled Article',
      description: article.description || 'No description available',
      content: article.body_markdown || article.description || 'Content not available',
      image: article.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      author: article.user?.name || 'Anonymous',
      readTime: `${Math.ceil(article.reading_time || 5)} min read`,
      publishedAt: article.published_at ? new Date(article.published_at).toLocaleDateString() : new Date().toLocaleDateString(),
      category: article.tags?.[0] || 'general'
    };
  }
  