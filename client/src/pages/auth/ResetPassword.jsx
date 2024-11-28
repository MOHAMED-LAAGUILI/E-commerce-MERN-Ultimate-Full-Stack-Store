import img from "../../assets/images/auth/reset-password.jpg";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosToastError from "../../utils/AxiosToastError";
import { toast } from "react-toastify";
import SummaryApi from "../../common/SummaryApi";
import Axios from "../../utils/Axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email:location?.state?.email, 
    newPassword: "",
    confirmNewPassword: "",
  });

  console.log(location?.state?.email);
  useEffect(() => {
    if (!location?.state?.data?.success) {
      redirect("/");
    }

    if (!location?.state?.email) {
      redirect("/");
    }
  }, []);

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Example: at least 8 characters, one uppercase, one lowercase, and one digit
    if (!passwordRegex.test(formData.newPassword)) {
      toast.error("Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers.");
      return;
    }
  
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Both Passwords Fields Must Match");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data:{
            email:formData.email, 
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword
        },
        // or use data: formData
      });
  
      if (response?.data?.error) {
        toast.error(response.data.message);
      }
  
      if (response?.data?.success) {
        toast.success(response.data.message);
        redirect("/login");
        setFormData({ email: "", newPassword: "", confirmNewPassword: "" });
      }
    } catch (e) {
      AxiosToastError(e);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-100 pt-20 flex justify-center items-center">
      <div className="flex w-full max-w-screen-xl bg-white overflow-hidden rounded-lg">
        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8 sm:p-10 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Set up New Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="relative">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="********"
                aria-label="Password"
              />
              <span
                onClick={togglePassword}
                className="absolute top-[45px] right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="********"
                aria-label="Confirm Password"
              />
              <span
                onClick={toggleConfirmPassword}
                className="absolute top-[45px] right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset"}
            </button>
          </form>
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

export default ResetPassword;
