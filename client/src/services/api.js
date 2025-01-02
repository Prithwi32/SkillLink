const DEV_TO_API = 'https://dev.to/api';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchDevToArticles(tag) {
  try {
    const response = await fetch(
      `${DEV_TO_API}/articles?tag=${tag}&per_page=6`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await delay(300);
    return response.json();
  } catch (error) {
    console.error(`Error fetching articles for tag ${tag}:`, error);
    return [];
  }
}

export async function fetchDevToArticleById(id) {
  try {
    const response = await fetch(
      `${DEV_TO_API}/articles/${id}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Article not found: ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error; // Re-throw to handle in the service layer
  }
}
