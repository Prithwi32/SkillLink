import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="text-center w-full">
        <div
          className="h-96 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        >
          <h1 className="text-9xl">4<span className="text-blue-800">0</span>4</h1>
        </div>

        <div className="mt-[-50px]">
          <h2 className="text-4xl font-bold">Look like you're lost</h2>
          <p className="mt-4 text-lg text-gray-600">
            The page you are looking for is not available!
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 text-white bg-blue-700 hover:bg-blue-800 rounded-md"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
