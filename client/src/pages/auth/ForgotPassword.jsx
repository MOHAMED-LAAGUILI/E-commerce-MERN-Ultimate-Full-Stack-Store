import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/auth/forgot-password.jpg";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: formData,
      });

      if (response?.data?.error) {
        toast.error(response.data.message);
      }

      if (response?.data?.success) {
        toast.success(response.data.message);
        redirect("/verify-otp",{
          state:{
            email:formData.email
          }
        });
        setFormData({
          email: "",
        });
      }


    } catch (e) {
      AxiosToastError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="flex w-full max-w-screen-xl bg-white overflow-hidden rounded-lg">
        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8 sm:p-10 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email and set a new password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                login here
              </Link>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden sm:flex sm:w-1/2 bg-blue-50">
          <img
            src={img}
            alt="Reset Password"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
