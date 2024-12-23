import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
