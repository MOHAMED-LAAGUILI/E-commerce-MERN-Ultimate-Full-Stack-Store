import { Link } from "react-router-dom";
//import img from "../assets/404-error-image.svg"; // Replace with your desired image asset

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-screen-md text-center">
        {/* Image */}
        <img
          src={""}
          alt="404 Not Found"
          className="w-full max-w-md mx-auto mb-8"
        />

        {/* Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page {"you're looking for doesn't"} exist.
        </p>

        {/* Actions */}
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
