import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import img from "../../assets/images/auth/sign-up.jpg";
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";

const Register = () => {
  // State to manage password visibility and form fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (formData.password !== formData.confirmPassword) {
        return toast.error("Password does not match");
      }

      const response = await Axios({
        ...SummaryApi.register,
        data: formData,
      });

      if (response?.data?.error) {
        console.log(`error: ${response.data.message}`);
        toast.error(response.data.message);
      }

      if (response?.data?.success) {
        console.log(`success: ${response.data.message}`);
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      redirect("/login");
    } catch (e) {
      AxiosToastError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 pt-20 flex justify-center items-center">
      <div className="flex w-full max-w-screen-xl bg-white overflow-hidden rounded-lg">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 hidden sm:block bg-slate-100">
          <img
            src={img}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="john_doe"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="********"
              />
              <span
                onClick={togglePassword}
                className="absolute top-[45px] right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="********"
              />
              <span
                onClick={toggleConfirmPassword}
                className="absolute top-[45px] right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={25} />
                ) : (
                  <FaEye size={25} />
                )}
              </span>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary-100 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
